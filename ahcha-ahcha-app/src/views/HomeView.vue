

<template>

    <TransactGraph ref="transactGraph"/>
    <TransactionLogWrite @logChanged="handleLogChanged"></TransactionLogWrite>

</template>


<script setup>
import {ref} from 'vue';
import TransactGraph from '../components/Home/TransactGraph.vue'
import TransactionLogWrite from '@/components/write/TransactionLogWrite.vue';

const transactGraph = ref(null);

const handleLogChanged = () => {
  if (transactGraph.value) {
    transactGraph.value.updateGraph();
  }
};
</script>