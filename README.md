# vue-nest-monorepo

## 目录

- [介绍](#介绍)
- [特点](#特点)
- [技术栈](#技术栈)
- [安装指南](#安装指南)
- [使用说明](#使用说明)
- [待办事项](#待办事项)
- [下一步计划](#下一步计划)

## 介绍

基于Typescript+vue3+nestjs+prisma+CASL的monorepo架构的全栈开发模板

本模板提供了完整的单体应用请求-响应链路，包括日志记录、身份验证、RBAC 控制、API 限流、请求数据序列化和响应数据序列化。

提供docker-compose及dockerfile便捷的本地调式及部署

项目旨在为有兴趣转向后端或全栈开发的前端同学提供参考和使用。

**注意：** 本项目目前仍在开发中。

## 特点

- 基于 RBAC 的权限管理系统，提供细粒度的 API 访问控制，防止越权访问。
- 采用 monorepo + TypeScript 架构，前端和后端可共享类型定义和方法。shared 包会同时打包为 CommonJS 和 ESM 格式，方便前后端调用。
- 使用 Prisma 快速构建数据库模型，并解决了 Prisma 无法使用 comment 描述字段入库的问题。
- 提供 Swagger UI 文档，方便 API 调试和文档管理。

## 技术栈

| 层级           | 技术                   |
| -------------- | ---------------------- |
| 前端           | Vue 3 + Vite           |
| 后端           | NestJS                 |
| 数据库和 ORM   | Prisma + MySQL + Redis |
| 数据验证       | class-validator        |
| 身份验证和授权 | JWT + CASL             |

### 目录结构
