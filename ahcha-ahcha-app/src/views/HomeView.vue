<template>
  <div class="container">
      <TransactGraph ref="transactGraph"/>
      <TransactTrack/>
      <WriteButton @logChanged="handleLogChanged"></WriteButton>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TransactGraph from '../components/Home/TransactGraph.vue';
import WriteButton from '@/components/write/WriteButton.vue';
import TransactTrack from '@/components/Home/TransactTrack.vue';

const transactGraph = ref(null);

const handleLogChanged = () => {
if (transactGraph.value) {
  transactGraph.value.updateGraph();
}
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
}

.container > * {
  margin: 10px 0;
}
</style>
