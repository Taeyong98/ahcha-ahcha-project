<template>
  <div class="another-month">
    <div class="label-month">
    <br/>
      <label class="title">다른 달 어떻게 사용했을까요? </label>
      <label>그래프에 마우스를 올려 확인해보세요</label><br/>
    </div>
    <div class="graph">
      <canvas ref="canvas" width="350px" height="400px"></canvas>
    </div>
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
    let chartInstance = null; // Chart instance를 저장하기 위한 변수

    const fetchData = async () => {
      try {
        // JSON Server에서 데이터 가져오기
        const response = await axios.get('http://localhost:3001/trade_list');
        const tradeList = response.data;
        

        // 월별 수입과 지출을 계산
        const monthlyData = {};
        tradeList.forEach(entry => {
          const date = entry.date.toString();
          const year = date.slice(0, 4);
          const month = date.slice(5, 7);

          // 추출한 년도와 월을 결합한 키를 생성하고 이에 해당하는 데이터를 그룹화
          const key = `${year}-${month}`;
          if (!monthlyData[key]) {
            monthlyData[key] = {
              income: 0,
              outcome: 0
            };
          }

          const price = parseFloat(entry.price);

          if (entry.type === 'income') {
            monthlyData[key].income += price;
          } else if (entry.type === 'outcome') {
            monthlyData[key].outcome += price;
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
                label: '수입',
                data: incomeData,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              },
              {
                label: '소비',
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
    });

    const updateGraph = async () => {
      await fetchData();
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
  margin-bottom: 0px;
}

.title {
  padding: 3px;
  font-size: 16px;
  margin-bottom: 0px;
  color: #333;
  font-weight: 300;
}

label{
  padding: 3px;
  font-size: 14px;
  margin-bottom: px;
  color: #999;
  font-weight: 200;
}
.another-month {
  margin-bottom: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
}

.label-month {
  width: 100%;
  margin-bottom: 15px; /* 라벨과 그래프 사이 간격 */
}

.graph {
  width: 100%;
  max-width: 400px; /* 최대 너비 설정 */
  height: 500px;
  display: flex;
  justify-content: center; /* 그래프 수평 중앙 정렬 */
  align-items: center; /* 그래프 수직 중앙 정렬 */
  
}
</style>

  