<template>


<div class="container-full text-center">
  <div class="row justify-content-center">
    <div class="col1">
      <TransactTrack></TransactTrack>
    </div>
    <div class="col2 d-flex justify-content-center align-items-center">
      <TransactGraph ref="transactGraph"/>
    </div>
  </div>
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
.container-full {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: #000000 solid 5px;

  padding:20px;
  margin:20px;
}

.col1{
  border: #FBE4A7 solid 3px;
  padding:10px;
  margin:10px;
  width: 500px;
  height: 500px;
}

.col2{
  border: #FBE4A7 solid 3px;
  margin:10px;
  width: 700px;
  height: 500px;
}
</style>
