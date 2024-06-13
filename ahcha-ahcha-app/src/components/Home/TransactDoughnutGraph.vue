<template>
  <div class="month-picker">
    <div class="date-picker">
      <input type="month" id="month" v-model="selectedMonth" @change="fetchData" /><br/>
      <canvas ref="canvas" width="300px" height="300px"></canvas>
      <div class="total-income">
        <label>수입</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>{{ formatCurrency(totalIncome) }}원</label><br/>
        <label>소비</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>{{ formatCurrency(totalExpenses) }}원</label><br/>
        <label>남은 금액</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label :class="balanceClass">{{ formatCurrency(balance) }}원</label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'TransactGraph',
  setup() {
    const canvas = ref(null);
    const selectedMonth = ref('');
    const totalIncome = ref(0); // 총 수입
    const totalExpenses = ref(0); // 총 소비
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

        let income = 0;
        let expenses = 0;

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
              income += price;
            } else if (entry.category === '교통비' || entry.category === '식비') {
              if (entry.category === '교통비') monthlyData.transport += price;
              if (entry.category === '식비') monthlyData.food += price;
              expenses += price;
            }
          }
        });

        // 총 수입과 총 소비를 업데이트
        totalIncome.value = income;
        totalExpenses.value = expenses;

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

    const updateDoughnutGraph = async () => {
      await fetchData();
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('ko-KR', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    };

    const balance = computed(() => totalIncome.value - totalExpenses.value);

    const balanceClass = computed(() => {
      return balance.value >= 0 ? 'positive-balance' : 'negative-balance';
    });

    return {
      canvas,
      selectedMonth,
      totalIncome,
      totalExpenses,
      fetchData,
      updateDoughnutGraph,
      formatCurrency,
      balance,
      balanceClass
    };
  }
};
</script>

<style scoped>
canvas {
  margin: 10px;
}

.date-picker {
  margin-bottom: 10px;
  text-align: center;
}

.month-picker {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
}
.total-income{
  background-color:#fafafa;
  border-radius: 8px;
  padding:20px;
}
input[type="month"] {
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

label {
  padding: 3px;
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 200;
}

.positive-balance {
  color: #FF3838;
  font-weight: 300;
}

.negative-balance {
  color: #0066FF;
  font-weight: 300;
}
</style>
