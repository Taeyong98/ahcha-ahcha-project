<template>
    <div>
      <div class="date-picker">
        <label for="month">Select Month </label><br>
        <input type="month" id="month" v-model="selectedMonth" @change="fetchData" />
      </div>
      <canvas ref="canvas" width="400" height="400"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    name: 'TransactGraph',
    setup() {
      const canvas = ref(null);
      const selectedMonth = ref('');
      let chartInstance = null; // Chart instance를 저장하기 위한 변수
  
      const fetchData = async () => {
        if (!selectedMonth.value) return;
  
        try {
          // JSON Server에서 데이터 가져오기
          const response = await axios.get('http://localhost:3001/trade_list');
          const tradeList = response.data;
          console.log("tradeList_Graph", tradeList);
  
          // 선택한 월의 "월급", "교통비", "식비"를 계산
          const monthlyData = {
            salary: 0,
            transport: 0,
            food: 0
          };
  
          tradeList.forEach(entry => {
            const date = entry.date.toString();
            const year = date.slice(0, 4);
            const month = date.slice(5, 7);
            const key = `${year}-${month}`;
  
            if (key === selectedMonth.value) {
              const price = parseFloat(entry.price);
  
              // 항목에 따라 데이터를 누적
              if (entry.category === '월급') {
                monthlyData.salary += price;
              } else if (entry.category === '교통비') {
                monthlyData.transport += price;
              } else if (entry.category === '식비') {
                monthlyData.food += price;
              }
            }
          });
  
          // 기존 차트가 있으면 파괴
          if (chartInstance) {
            chartInstance.destroy();
          }
  
          // Chart.js를 사용하여 도넛 차트 생성
          const config = {
            type: 'doughnut',
            data: {
              labels: ['월급', '교통비', '식비'],
              datasets: [{
                data: [monthlyData.salary, monthlyData.transport, monthlyData.food],
                backgroundColor: [
                  'rgb(75, 192, 192)',
                  'rgb(241, 183, 63)',
                  'rgb(255, 99, 132)'
                ],
                hoverOffset: 4
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                //   text: `${selectedMonth.value} 월의 월급, 교통비, 식비 비율`
                }
              }
            }
          };
  
          // 그래프를 캔버스에 렌더링
          const ctx = canvas.value.getContext('2d');
          chartInstance = new Chart(ctx, config);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      onMounted(() => {
        // 페이지 로드 시 초기 데이터 가져오기
        fetchData();
      });
  
      return {
        canvas,
        selectedMonth,
        fetchData,
      };
    }
  };
  </script>
  
  <style scoped>

 
  canvas {
    margin-bottom: 20px;
  }
  
  .date-picker {
    margin-bottom: 20px;
  }
  label{
    padding-bottom: 10px;
  }
  </style>
  