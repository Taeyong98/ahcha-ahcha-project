<template>
    <div>
      <h2>거래 목록</h2>

      <table>
        <tr v-for="trade in userTrades" :key="trade.date" >
          <td>{{ formatDate(trade.date) }}</td>
          <td>{{ trade.category }}</td>
          <td :class="{'income': trade.type === 'income', 'outcome': trade.type === 'outcome'}">{{ trade.price }}원</td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  
  export default {
    setup() {
      const jsonData = {
        "user_category": [
          {
            "id": "ted",
            "income": ["월급", "환급금", "기타"],
            "outcome": ["식비", "교통", "기타"]
          }
        ],
        "trade_list": [
          {
            "type": "income",
            "category": "월급",
            "price": "30,000,000",
            "date": 20240611,
            "memo": "월급이당~",
            "user_id": "ted"
          },
          {
            "type": "outcome",
            "category": "식비",
            "price": "30,000",
            "date": 20240610,
            "memo": "옴아카세",
            "user_id": "ted"
          }, 
          {
            "type": "outcome",
            "category": "간식비",
            "price": "20,000",
            "date": 20240609,
            "memo": "옴아카세",
            "user_id": "ted"
          }
        ],
        "user_list": [
          {
            "user_id": "ted",
            "user_name": "태용",
            "user_nickname": "태용",
            "phone_num": "010-4444-4444",
            "email": "example@example.com",
            "password": "akf;ajkd;ajf"
          },
          {
            "user_id": "ted1",
            "user_name": "태용1",
            "user_nickname": "태용1",
            "phone_num": "010-4444-4444",
            "email": "example@example.com",
            "password": "akf;ajkd;ajf"
          }
        ]
      };
  
      const currentUserCategory = ref({});
      const userTrades = ref([]);
  
      const currentDate = (()=>{

      let date = new Date();
      
      const year = date.getFullYear();  
      const month = (date.getMonth() + 1).toString().padStart(2, '0');  
      const day = date.getDate().toString().padStart(2, '0'); 
      const yyyymmdd = `${year}${month}${day}`;

      console.log(yyyymmdd);
        return yyyymmdd;
    });

    //   const formatDate = (timestamp) => {
    //     console.log(timestamp);
    //     const date = new Date(timestamp * 1000);
    //     const year = date.getFullYear();
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //     const day = date.getDate().toString().padStart(2, '0');

    //     let d = `${year}.${month}.${day}`
    //     console.log(d);
    //     return d;
    //   };
  
  
      onMounted(() => {
        const currentUserData = jsonData.user_category.find(user => user.id === "ted");
        const userTradeData = jsonData.trade_list.filter(trade => {
            let date = currentDate();
            console.log(trade.date);
            console.log(date);
            return trade.user_id === "ted" && trade.date === date;
        });
  
        currentUserCategory.value = currentUserData;
        userTrades.value = userTradeData;
      });
  
      const currentUser = computed(() => jsonData.user_list.find(user => user.user_id === "ted"));
  
      return {
        currentUser,
        currentUserCategory,
        userTrades
        // formatDate
      };
    }
  };
  </script>
  
  <style scoped>
  .income {
    color: #ff3838;
  }
  
  .outcome {
    color: #0066ff;
  }
  
  td {
    padding: 15px 25px;
  }
  </style>
  