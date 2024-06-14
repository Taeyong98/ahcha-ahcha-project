<template>
  <div class="container-full ">
    
    <div class="widget-container">

      <!-- 오른쪽 위젯 -->
      <div class="right_widget">
        <div class="widgetGraph">
          <div class="graph2"><TransactDoughnutGraph ref="transactDoughnutGraph" /></div>
          <div class="graph1"><TransactGraph ref="transactGraph" /></div>
        </div>
      </div>

      <!-- 왼쪽 위젯-->
      <div class="left_widget">
        <TransactTrack ref="transactTrack" class="widget"/>
      </div>
    </div>
      
    <!-- 로그 변경 버튼 -->
    <WriteButton @logChanged="handleLogChanged" class="write-button"></WriteButton>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import TransactGraph from '../components/Home/TransactGraph.vue';
import WriteButton from '@/components/write/WriteButton.vue';
import TransactTrack from '@/components/Home/TransactTrack.vue';
import TransactDoughnutGraph from '@/components/Home/TransactDoughnutGraph.vue';

const transactGraph = ref(null);
const transactDoughnutGraph = ref(null);
const transactTrack = ref(null);

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
  padding: 20px;
  margin: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.widget-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px;
}

.left_widget{
  display : flex;
  /* justify-content: center; */
  margin : 0 20px;
  width : 390px;

}
.right_widget {
  display: flex;
  /* justify-content: center; */
  margin: 0 20px;
  width : 800px

}

.widget {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; /* widget의 최대 너비 설정 */
  height: 600px; /* widget의 고정 높이 설정 */

}

.widgetGraph {
  display: flex;
  justify-content: center;
  align-items: center; /* 세로 방향 중앙 정렬 */
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 800px; /* widgetGraph의 최대 너비 설정 */
  height: 600px; /* widgetGraph의 고정 높이 설정 */
  overflow: auto; /* 내용이 넘칠 경우 스크롤 추가 */
}

.graph1,
.graph2 {
  width : 400px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 방향 중앙 정렬 */
}
</style>
