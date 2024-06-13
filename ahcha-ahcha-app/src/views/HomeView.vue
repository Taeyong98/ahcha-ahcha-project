<template>
  <div class="container-full text-center">
    <div class="row justify-content-center">
      <!-- 왼쪽 위젯 -->
      <div class="left_widget col-md-6 mb-3 mb-md-0">
        <TransactTrack ref="transactTrack" class="widget"/>
      </div>

      <!-- 오른쪽 위젯 -->
      <div class="right_widget col-md-6" >
        <div class="row justify-content-center">
          
          <div class="row">
          <!-- 그래프 위젯 -->
          <div class="widgetGraph">
            <div class="mb-3">
              <TransactGraph ref="transactGraph" width="400px" height="500px"/>
            </div>
            <div >
              <TransactDoughnutGraph ref="transactDoughnutGraph" width="400px" height="500px"/>
            </div>
          </div>  
          </div>
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
  margin: 30px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.left_widget{

  margin: 0px;

} 
.justify-content-center{

  margin: 0px;

}

.row {
  width: 100%;
  margin-bottom: 200px;
  margin:0px;
}

.container-full{

  margin:0px;

} 
.col-md-6 {
  margin-bottom: 20px;
}

.left_widget,
.right_widget {
  display: flex;
  justify-content: center;
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
  overflow: auto; /* 내용이 넘칠 경우 스크롤 추가 */
}

.widgetGraph {
  display: flex;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px; /* widgetGraph의 최대 너비 설정 */
  height: 600px; /* widgetGraph의 고정 높이 설정 */
  overflow: auto; /* 내용이 넘칠 경우 스크롤 추가 */
}



</style>
