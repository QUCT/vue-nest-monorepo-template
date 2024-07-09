<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup lang="ts">
import { commonFunction } from 'shared'
import type { CommonInterface } from 'shared'

const data: CommonInterface = {
  id: 1,
  name: 'Vue',
  time: 'ttt'
}

console.log(commonFunction(), data)
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
