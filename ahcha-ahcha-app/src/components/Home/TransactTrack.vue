<template>
    <div>
      <div class="upperPart">
        <h3>거래 목록</h3>
        <div id="decideDate">
          <button type="button" @click="changeDate(-1)"><</button>
          <span>{{ formatDate(currentDate) }}</span>
          <button type="button" @click="changeDate(1)">></button> 
        </div>
      </div>
      
  
      
      <table class="content">
        <tr v-for="trade in userTrades" :key="trade.date">
          <td>{{ trade.date }}</td>
          <td>{{ trade.category }}</td>
          <td :class="{'income': trade.type === 'income', 'outcome': trade.type === 'outcome'}">{{ trade.price }}원</td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
        
      const userTrades = ref([]);
      const currentDate = ref(new Date()); // 현재 날짜를 Date 객체로 저장
  
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }; //날짜 Date 형식 통일 
  
      const changeDate = (daysToAdd) => {
        currentDate.value.setDate(currentDate.value.getDate() + daysToAdd); // 현재 날짜를 업데이트
        fetchData(formatDate(currentDate.value)); // 새로운 날짜로 데이터 가져오기
      };
  
      const fetchData = async (date) => {
        try {
          const tradeListResponse = await axios.get('http://localhost:3001/trade_list');
          // const userListResponse = await axios.get('http://localhost:3001/user_list');
  
          const userTradeData = tradeListResponse.data.filter(trade => {
            return trade.date.toString() === date.toString();
          });
  
          userTrades.value = userTradeData.map(trade => ({
            ...trade,
            price: parseInt(trade.price) // price를 숫자로 변환
          }));
        } catch (error) {
          console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
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
        currentDate,
        changeDate,
        updateList
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

h3{
  margin-bottom:15px;
}
.upperPart {
  border: #FBE4A7 solid 5px;
  background-color: #FBE4A7;
  border-radius: 10px;
  padding: 10px;
  text-align: center; /* Center align text inside the div */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align items horizontally */
}


#decideDate {
  border: white solid 5px;
  background-color: white;
  width: 200px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between; /* Space out the button and span elements */
  align-items: center; /* Center align items vertically */
}

  </style>
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
  