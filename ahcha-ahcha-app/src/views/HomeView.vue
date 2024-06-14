<template>
  <div class="container-full">
    <div class="widget-container">

      <!-- 왼쪽 위젯-->
      <div class="left_widget">
        <TransactTrack ref="transactTrack" class="widget"/>
      </div>
      
      <!-- 오른쪽 위젯 -->
      <div class="right_widget">
        <div class="widgetGraph">
          <div class="graph2"><TransactDoughnutGraph ref="transactDoughnutGraph" /></div>
          <div class="graph3"><TransactDoughnutGraphInome ref="transactDoughnutGraphInome" /></div>

          <div class="divider"></div> <!-- 구분선 추가 -->
            <div class="graph1" ><TransactGraph ref="transactGraph" /></div>
  
          
        </div>
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
import TransactDoughnutGraphInome from '@/components/Home/TransactDoughnutGraphIncome.vue';

const transactGraph = ref(null);
const transactDoughnutGraph = ref(null);
const transactDoughnutGraphIncome = ref(null);
const transactTrack = ref(null);

// 수정 부분
const selectedMonth = ref('');
const showDefaultDoughnutGraph = ref(true);

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
  // 클릭하면 false로 전환
  showDefaultDoughnutGraph.value = false; 
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
  display: flex;
  align-items: flex-start; /* 왼쪽과 오른쪽 위젯을 가로로 정렬 */
  justify-content: center;
  padding: 20px;
  margin: 20px;
  gap: 20px; /* 위젯들 사이의 간격 설정 */
}

.left_widget {
  width: 390px;
}

.right_widget {
  display: flex;
  flex-direction: column; /* 내부 컴포넌트들을 세로로 배열하기 위해 flex-direction 설정 */
  align-items: center; /* 가운데 정렬 */
  width: 1000px; /* 오른쪽 위젯의 너비를 조정 */
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
  margin-bottom: 20px; /* 위젯과 위젯 사이 간격 주기 */
}

.widgetGraph {
  display: flex;
  flex-wrap: wrap; /* 그래프들이 한 줄에 다 들어가지 않으면 wrap */
  justify-content: center; /* 그래프들 가로 방향 중앙 정렬 */
  align-items: center; /* 그래프들 세로 방향 중앙 정렬 */
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%; /* 최대 너비 설정 */
  height: auto; /* 고정 높이 설정 */
  overflow: auto; /* 내용이 넘칠 경우 스크롤 추가 */
}

.graph1 {
  width: 600px; /* graph1의 너비를 600px로 고정 */
  height: 400px; /* 높이도 400px로 고정 */
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 방향 중앙 정렬 */
}
.graph2,
.graph3 {
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 방향 중앙 정렬 */
  padding:5px;
  margin:5px;
}

.divider {
  width: 100%;
  height: 3px;
  background-color: #ddd;
  margin: 20px 0; /* 위아래 간격 조정 */
}
</style>
