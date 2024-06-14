<template>
    <div>
      <div class="upperPart">
        <div id="decideDate">
          <button type="button" @click="changeDate(-1)">
            <img src="/Users/test/Documents/ahcha-ahcha-project/ahcha-ahcha-app/src/assets/home/right arrow.png" />
          </button>
          <span>{{ formatDate(currentDate) }}</span>
          <button type="button" @click="changeDate(1)">
            <img src="/Users/test/Documents/ahcha-ahcha-project/ahcha-ahcha-app/src/assets/home/left arrow.png" />
          </button>
        </div>
      </div>
  
      <div class="content">
        <table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>목록</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trade in userTrades" :key="trade.date">
              <td>{{ trade.date }}</td>
              <td>{{ trade.category }}</td>
              <td :class="{'income': trade.type === 'income', 'outcome': trade.type === 'outcome'}">{{ formatPrice(trade.price) }}원</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const userTrades = ref([]);
      const currentDate = ref(new Date());
  
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  
      const formatPrice = (price) => {
        return price.toLocaleString();
      };
  
      const changeDate = (daysToAdd) => {
        currentDate.value.setDate(currentDate.value.getDate() + daysToAdd);
        fetchData(formatDate(currentDate.value));
      };
  
      const fetchData = async (date) => {
        try {
          const response = await axios.get('http://localhost:3001/trade_list');
          const userTradeData = response.data.filter(trade => trade.date.toString() === date.toString());
  
          userTrades.value = userTradeData.map(trade => ({
            ...trade,
            price: parseInt(trade.price)
          }));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      onMounted(() => {
        fetchData(formatDate(currentDate.value));
      });
  
      const updateList = () => {
        fetchData(formatDate(currentDate.value));
      };
  
      return {
        userTrades,
        formatDate,
        formatPrice,
        currentDate,
        changeDate,
        updateList
      };
    }
  };
  </script>
  
  <style scoped>
  
  span{
    font-size: 16px;
    font-weight: 350;
  }
  th{
    font-size: 16px;
    font-weight: 350;
  }
  table{
    font-size: 16px;
    font-weight: 200;
  }
  
  .income {
    color: #ff3838;
  }
  
  .outcome {
    color: #0066ff;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead {
    background-color: #f9f9f9;
  }
  
  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  h3 {
    margin-bottom: 15px;
  }
  
  button {
    background-color: transparent;
    border: none;
  }
  
  .upperPart {
    border: #fbe4a7 solid 5px;
    background-color: #fbe4a7;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .content {
    overflow: auto; /* 스크롤이 필요할 때만 스크롤바가 나타납니다. */
    max-height: 500px; /* 최대 높이를 지정하여 스크롤이 나타날 때 최대 높이를 제한합니다. */
  }
  
  #decideDate {
    border: white solid 5px;
    background-color: white;
    width: 200px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  img {
    width: 20px;
    height: 20px;
  }
  </style>
  