<template>
  
    <TransactGraph ref="transactGraph"/>
    <TransactTrack ref="transactTrack"/>
    <!-- <WriteButton @logChanged="handleLogChanged"></WriteButton> -->
  
</template>

<script setup>
import { ref } from 'vue';
import TransactTrack from '@/components/Home/TransactTrack.vue';
import TransactGraph from '@/components/Home/TransactGraph.vue';
// import WriteButton from '@/components/WriteButton.vue';

const transactGraph = ref(null);
const transactTrack = ref(null);

const handleLogChanged = () => {
  if (transactGraph.value) {
    transactGraph.value.updateGraph();
  }

  if (transactTrack.value) {
    transactTrack.value.updateList();
  }
};
</script>
