<script setup>
</script>

<template>

    <TransactGraph ref="transactGraph"/>
    <WriteButton @logChanged="handleLogChanged"></WriteButton>


</template>


<script setup>
import {ref} from 'vue';
import TransactGraph from '../components/Home/TransactGraph.vue'
import WriteButton from '@/components/write/WriteButton.vue';

const transactGraph = ref(null);

const handleLogChanged = () => {
  if (transactGraph.value) {
    transactGraph.value.updateGraph();
  }
};
</script>