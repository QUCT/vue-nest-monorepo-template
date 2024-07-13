#! /usr/bin/env ts-node

/**
 * This is a custom generator for Prisma that generates comments for all models fields and
 *  handles creating a migration file for them when comments change.
 *
 * The comments are generated from the documentation field in the Prisma schema (e.g. the /// comments
 *  in the schema file).
 *
 * It works based on a lock file of all comment statements. When it detects that the comments have
 * changed (by comparing the sha256 hash of them), the commited lock file will be updated. In addition,
 * a new migration file will be created with all comments.
 *
 * For our purposes its not a big issue since running the sql statements that add comments
 *  should be cheap anyway.
 *
 * This is a workaround to have https://github.com/prisma/prisma/issues/8703 before it is implemented
 * in Prisma itself.
 */

import { promises as fs } from 'fs';
import { createHash } from 'crypto';

import { Prisma } from '@prisma/client';

// import { parseEnvValue } from '@prisma/client';
import { GeneratorOptions, generatorHandler } from '@prisma/generator-helper';
import { snakeCase } from 'lodash';

// const debugLog = debug('prisma:generate-comments');

async function generateModelComment(model: any): Promise<string[]> {
  const modelName = model.dbName ?? model.name;

  const commentStatements: string[] = [];

  const tableComment = model.documentation;
  // comment table
  if (tableComment) {
    let tableCommentStr = `ALTER TABLE ${modelName} COMMENT '${tableComment}';`;
    commentStatements.push(tableCommentStr);
  }

  // comment fields
  model.fields.forEach((field: any) => {
    if (!field.documentation) {
      return;
    }

    // debugLog(`Generating comment for ${modelName}.${field.name}...`);

    const escapedComment = field.documentation?.replace(/'/g, "''") ?? '';

    // const commentTemplate = `COMMENT ON COLUMN "${modelName}"."${field.name}" IS '${escapedComment}';`;

    let fieldName = snakeCase(field.name);

    const commentTemplate = `SET @column_type = ( SELECT column_type FROM information_schema.COLUMNS WHERE table_name = '${modelName}' AND column_name = '${fieldName}' );
    SET @alter_sql = CONCAT( 'ALTER TABLE ${modelName} MODIFY COLUMN ${fieldName} ', @column_type, ' COMMENT ''${escapedComment}''' );
    PREPARE alter_statement  FROM @alter_sql;
    EXECUTE alter_statement;
    DEALLOCATE PREPARE alter_statement;`;
    commentStatements.push(commentTemplate);
  });

  return [`-- Model ${modelName} comments`, '', ...commentStatements, ''];
}

async function fileHash(file: string, allowEmpty = false): Promise<string> {
  try {
    const fileContent = await fs.readFile(file, 'utf-8');

    // now use sha256 to hash the content and return it
    return createHash('sha256').update(fileContent).digest('hex');
  } catch (e: any) {
    if (e.code === 'ENOENT' && allowEmpty) {
      return '';
    }

    throw e;
  }
}

async function lockChanged(
  lockFile: string,
  tmpLockFile: string,
): Promise<boolean> {
  return (await fileHash(lockFile, true)) !== (await fileHash(tmpLockFile));
}

export async function generate(options: GeneratorOptions) {
  const outputDir = './migrations';
  await fs.mkdir(outputDir, { recursive: true });

  const prismaClientProvider = options.otherGenerators.find(
    (it) => 'prisma-client-js' === 'prisma-client-js',
  );

  const promises: Promise<string[]>[] = [];
  Prisma.dmmf.datamodel.models.forEach((model: any) => {
    // debugLog(`Generating comment for ${model.name}...`);
    promises.push(generateModelComment(model));
  });

  const allStatements = await Promise.all(promises);

  const tmpLock = await fs.open(`${outputDir}/.comments-lock.tmp`, 'w+');

  await tmpLock.write('-- generator-version: 0.0\n\n');

  // concat all promises and separate with new line and two newlines between each model
  const allStatementsString = allStatements
    .map((statements) => statements.join('\n'))
    .join('\n\n');

  await tmpLock.write(allStatementsString);
  await tmpLock.close();

  // compare hashes of tmp lock file and existing lock file
  // if they are the same, do nothing
  // if they are different, write tmp lock file to lock file
  // if lock file does not exist, also write tmp lock file to lock file
  const isChanged = await lockChanged(
    `${outputDir}/.comments-lock`,
    `${outputDir}/.comments-lock.tmp`,
  );

  if (isChanged) {
    await fs.copyFile(
      `${outputDir}/.comments-lock.tmp`,
      `${outputDir}/.comments-lock`,
    );

    // when lockfile changed we generate a new migration file too
    const date = new Date();
    date.setMilliseconds(0);

    const dateStr = date
      .toISOString()
      .replace(/[:\-TZ]/g, '')
      .replace('.000', '');
    const migrationDir = `prisma/migrations/${dateStr}_update_comments`;

    console.log(
      `Lock file changed, creating a new migration at ${migrationDir}...`,
    );

    await fs.mkdir(migrationDir, { recursive: true });

    await fs.copyFile(
      `${outputDir}/.comments-lock`,
      `${migrationDir}/migration.sql`,
    );
  } else {
    console.log(
      'No changes detected, skipping creating a fresh comment migration...',
    );
  }

  // always delete tmp lock file
  await fs.unlink(`${outputDir}/.comments-lock.tmp`);

  console.log('Comment generation completed');
}

generatorHandler({
  onManifest() {
    return {
      defaultOutput: 'comments',
      prettyName: 'Prisma Database comments Generator',
    };
  },
  onGenerate: generate,
});
