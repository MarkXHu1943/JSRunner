<template>
  <div class="exec">
    {{ $route.params.id }}
  </div>
</template>

<script setup lang="ts">
import { getItem, runCodeInBrowser, runCodeInSandbox } from '@/utils'

const route = useRoute()

const code = getItem('code/' + route.params.id)

onMounted(() => {
  runCode()
})

function runCode() {
  // TODO: Add env
  console.log('runCode', code)
}
</script>

<style scoped></style>
