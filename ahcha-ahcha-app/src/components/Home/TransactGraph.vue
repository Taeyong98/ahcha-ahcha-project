<template>
    <div>
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted,inject } from 'vue';
  import axios from 'axios';
  import { Chart, registerables } from 'chart.js';

  
  Chart.register(...registerables);
  
  export default {


    name: 'TransactGraph',
    setup() {
      const canvas = ref(null);
      let chartInstance = null; // Chart instance를 저장하기 위한 변수
  
      const fetchData = async () => {
        try {
          // JSON Server에서 데이터 가져오기
          const response = await axios.get('http://localhost:3001/trade_list');
          const tradeList = response.data;
          console.log("tradeList_Graph",tradeList);
  
          // 월별 수입과 지출을 계산
          const monthlyData = {};
          tradeList.forEach(entry => {
            const date = entry.date.toString();
            console.log("date_Graph",date)
            const year = date.slice(0, 4);
            console.log("year",year)
            const month = date.slice(5, 7);
            console.log("month",month)
  
            // 추출한 년도와 월을 결합한 키를 생성하고 이에 해당하는 데이터를 그룹화
            const key = `${year}-${month}`;
            if (!monthlyData[key]) {
              monthlyData[key] = {
                income: 0,
                outcome: 0
              };
            }
            if (entry.type === 'income') {
              monthlyData[key].income += entry.price;
            } else if (entry.type === 'outcome') {
              monthlyData[key].outcome += entry.price;
            }
          });
  
          // 그래프를 그리기 위한 데이터 생성
          const labels = [];
          const incomeData = [];
          const outcomeData = [];
          for (const key in monthlyData) {
            if (Object.hasOwnProperty.call(monthlyData, key)) {
              labels.push(key);
              incomeData.push(monthlyData[key].income);
              outcomeData.push(monthlyData[key].outcome);
            }
          }
  
          // 기존 차트가 있으면 파괴
          if (chartInstance) {
            chartInstance.destroy();
          }
  
          // Chart.js를 사용하여 그래프 생성
          const config = {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Income',
                  data: incomeData,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                },
                {
                  label: 'Outcome',
                  data: outcomeData,
                  borderColor: 'rgb(255, 99, 132)',
                  tension: 0.1
                }
              ]
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
        // 초기 데이터 가져오기
        fetchData();
        
  
    //     // 주기적으로 데이터 업데이트
    //     setInterval(fetchData, 60000); // 1분마다 데이터 업데이트
      });
      const updateGraph = () => {
      fetchData();
    };
  
      return {
        canvas,
        updateGraph
      };
    }
  };
  </script>
  
  <style scoped>
  canvas {
    margin-bottom: 20px;
  }
  </style>
  