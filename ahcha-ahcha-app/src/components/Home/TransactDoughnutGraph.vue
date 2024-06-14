<template>
  <div class="month-picker">
    <div class="date-picker">
      <label>이번 달 얼마 남았을까요? </label><br/>
      <input type="month" id="month" v-model="selectedMonth" @change="fetchData" />
      
      <div style="width: 400px; height: 550px;">
        <canvas ref="canvas"></canvas>
        <div class="total-income">
          <label>수입</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>{{ formatCurrency(totalIncome) }}원</label><br/>
          <label>소비</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>{{ formatCurrency(totalExpenses) }}원</label><br/>
          <label id="total">남은 금액</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label :class="balanceClass">{{ formatCurrency(balance) }}원</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed,watch } from 'vue';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'TransactGraph',
  setup() {
    const canvas = ref(null);
    const selectedMonth = ref('');
    const totalIncome = ref(0);
    const totalExpenses = ref(0);
    const categories = ref([]);
    let chartInstance = null;
    let latestMonth = '';

    const firstFetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/trade_list');
        const tradeList = response.data;

        const userId = sessionStorage.getItem('userid');
        const userTradeList = tradeList.filter(entry => entry.userid === userId);
        latestMonth = getLatestMonth(tradeList);

        selectedMonth.value = latestMonth;
        const filteredData = filterDataByMonth(tradeList, latestMonth);

        const categorySet = new Set(tradeList.map(entry => entry.category));
        categories.value = Array.from(categorySet);
        let income = 0;
        let expenses = 0;
        const categoryData = {};

        categories.value.forEach(category => {
          categoryData[category] = 0;
        });

        filteredData.forEach(entry => {
          const price = parseFloat(entry.price);
          categoryData[entry.category] += price;
          if (entry.type === 'income') {
            income += price;
          } else if (entry.type === 'outcome') {
            expenses += price;
          }
        });
        totalIncome.value = income;
        totalExpenses.value = expenses;

        if (chartInstance) {
          chartInstance.destroy();
        }
        const ctx = canvas.value.getContext('2d');
        chartInstance = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: categories.value,
            datasets: [{
              data: categories.value.map(category => categoryData[category]),
              backgroundColor: categories.value.map(() => `hsl(${Math.random() * 360}, 100%, 75%)`),
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
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  
    const fetchData = async () => {
    
      try {
        const response = await axios.get('http://localhost:3001/trade_list');
        const tradeList = response.data;

        const userId = sessionStorage.getItem('userid');
        const userTradeList = tradeList.filter(entry => entry.userid === userId);


        const categorySet = new Set(tradeList.map(entry => entry.category));
        categories.value = Array.from(categorySet);
        let income = 0;
        let expenses = 0;
        const categoryData = {};

        categories.value.forEach(category => {
          categoryData[category] = 0;
        });
        
        

        tradeList.forEach(entry => {
          const date = entry.date.toString();
          const year = date.slice(0, 4);
          const month = date.slice(5, 7);
          const key = `${year}-${month}`;

          if (key === selectedMonth.value) {
            const price = parseFloat(entry.price);
            if (entry.type === 'income') {
              categoryData[entry.category] += price;
              income += price;
            } else if (entry.type === 'outcome') {
              categoryData[entry.category] += price;
              expenses += price;
            }
          }
        });

        totalIncome.value = income;
        totalExpenses.value = expenses;

        if (chartInstance) {
          chartInstance.destroy();
        }

        const ctx = canvas.value.getContext('2d');
        chartInstance = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: categories.value,
            datasets: [{
              data: categories.value.map(category => categoryData[category]),
              backgroundColor: categories.value.map(() => `hsl(${Math.random() * 360}, 100%, 75%)`),
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
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    

    // Helper function to get the latest month from the data
const getLatestMonth = (data) => {
  const months = data.map(entry => entry.date.slice(0, 7)); // Assuming date format 'YYYY-MM-DD'
  return Array.from(new Set(months)).sort().reverse()[0];
};

// Helper function to filter data by a specific month
const filterDataByMonth = (data, month) => {
  return data.filter(entry => entry.date.startsWith(month));
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

    onMounted(() => {
      firstFetchData(); // Ensure this function is called when component is mounted
    });

    return {
      canvas,
      selectedMonth,
      totalIncome,
      totalExpenses,
      categories,
      fetchData,
      formatCurrency,
      balance,
      balanceClass,
      firstFetchData
    };
  }
};
</script>

<style scoped>
canvas {
  margin: 10px;
  width: 100%;
  height: 100%;
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

.total-income {
  background-color: #fafafa;
  border-radius: 8px;
  padding: 20px;
}

input[type="month"] {
  padding: 8px;
  margin-bottom: 0px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

label {
  padding: 3px;
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 300;
}

#total {
  font-weight: 300;
}

.positive-balance {
  color: #ff3838;
  font-weight: 300;
}

.negative-balance {
  color: #0066ff;
  font-weight: 300;
}

.categories {
  margin-top: 20px;
}

.categories ul {
  list-style: none;
  padding: 0;
}

.categories li {
  margin: 5px 0;
}
</style>