<template>

<div class="container-full text-center">
  <div class="row justify-content-center">
    <div class="col1">
      <TransactTrack></TransactTrack>
    </div>
    <div class="col2 d-flex justify-content-center align-items-center">
      <TransactGraph ref="transactGraph"/>
      <TransactDoughnutGraph ref="transactGraph"/>
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
import TransactDoughnutGraph from '@/components/Home/TransactDoughnutGraph.vue';

// 전역으로 ref 변수들을 정의
const transactGraph = ref(null);
const transactDoughnutGraph = ref(null);
const transactTrack = ref(null);

// handleLogChanged 함수를 정의합니다.
const handleLogChanged = () => {
  if (transactGraph.value) {
    transactGraph.value.updateGraph();
  }
  if (transactDoughnutGraph.value) {
    transactDoughnutGraph.value.updateDoughnutGraph();
  }

  if (transactTrack.value) {
    transactTrack.value.updateList();
  }
};
</script>

<style scoped>
.container-full{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: #000000 solid 5px; */

  padding:10px;
  margin:30px;
}

.col1{
  border: #FBE4A7 solid 3px;
  border-radius: 10px;
  padding:10px;
  margin:10px;
  width: 400px;
  height: 550px;
  margin-right: 50px; /* col1의 오른쪽에 50px 간격 */
}

.col2{
  border: #FBE4A7 solid 3px;
  border-radius: 10px;
  margin:10px;
  width: 1100px;
  height: 550px;
  padding:20px;
  margin-left: 50px; /* col2의 왼쪽에 50px 간격 */
  margin-bottom: 50px; /* 두 컴포넌트 사이에 50px 간격을 줍니다 */
}




</style>
