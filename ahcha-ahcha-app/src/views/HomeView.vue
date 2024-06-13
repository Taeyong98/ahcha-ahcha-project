<template>
  <div class="container-full text-center">
    <div class="row justify-content-center">
      <div class="col-md-6 mb-3 mb-md-0">
        <TransactTrack ref="transactTrack" class="widget"/>
      </div>
      <div class="col-md-6">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <TransactGraph ref="transactGraph" class="widgetGraph"/>
          </div>
          <div class="col-md-6">
            <TransactDoughnutGraph ref="transactDoughnutGraph" class="widgetGraph"/>
          </div>
        </div>
      </div>
    </div>
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

.row {
  width: 100%;
  margin-bottom: 20px;
}

.col-md-6 {
  margin-bottom: 20px;
}

.widget {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; /* Set the maximum width for the widgets */
  height: 500px; /* Set a fixed height for the widgets */
}

.widgetGraph{
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px; /* Set the maximum width for the widgets */
  height: 500px; /* Set a fixed height for the widgets */
}

.write-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.write-button:hover {
  background-color: #0056b3;
}
</style>
