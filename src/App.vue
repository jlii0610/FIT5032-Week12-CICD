<template>
  <BHeader v-if="showHeader" />

  <div class="container my-4">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BHeader from './components/BHeader.vue';

const route = useRoute();

const showHeader = computed(() => {
  return route.name !== 'CountBookAPI' &&
         route.name !== 'GetAllBookAPI';
});
</script>

