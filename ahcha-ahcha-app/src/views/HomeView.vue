<template>
  <div class="container">
    <TransactGraph ref="transactGraph"/>
    <TransactTrack ref="transactTrack"/>
    <WriteButton @logChanged="handleLogChanged"></WriteButton>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TransactGraph from '../components/Home/TransactGraph.vue';
import WriteButton from '@/components/write/WriteButton.vue';
import TransactTrack from '@/components/Home/TransactTrack.vue';

// 전역으로 ref 변수들을 정의합니다.
const transactGraph = ref(null);
const transactTrack = ref(null);

// handleLogChanged 함수를 정의합니다.
const handleLogChanged = () => {
  if (transactGraph.value) {
    transactGraph.value.updateGraph();
  }

  if (transactTrack.value) {
    transactTrack.value.updateList();
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
