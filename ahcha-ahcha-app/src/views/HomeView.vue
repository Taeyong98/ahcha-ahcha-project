<template>
  <div class="container-full text-center">
    <div class="row justify-content-center">
      <div class="col-md-6 mb-3 mb-md-0">
        <TransactTrack ref="transactTrack"></TransactTrack>
      </div>
      <div class="col-md-6">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <TransactGraph ref="transactGraph"/>
          </div>
          <div class="col-md-6">
            <TransactDoughnutGraph ref="transactDoughnutGraph"/>
          </div>
        </div>
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
.container-full {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 30px;
}

.col-md-6 {
  margin-bottom: 20px;
}

.col1, .col2 {
  border: #FBE4A7 solid 3px;
  border-radius: 10px;
  padding: 10px;
}

.col1 {
  width: 100%;
  max-width: 400px;
}

.col2 {
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

</style>
