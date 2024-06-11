<template>
    <TradeList v-bind:trade-list="states.tradeList" 
               v-bind:category="states.category">
    </TradeList>

   <!-- <TransactionLogWrite @logChanged="fetchTradeList"></TransactionLogWrite> -->
</template>


<script>
import TradeList from '../components/TradeList/TradeList.vue'
import TransactionLogWrite from '@/components/write/TransactionLogWrite.vue';
import { ref, computed, reactive, provide, onMounted } from 'vue';
import axios from 'axios';

export default{
    components:{
        TradeList,
        //우정님 모달 추가
        TransactionLogWrite
    },
    setup(){
        const BASEURL = "http://localhost:3001";
        const states = reactive({
            tradeList:[],
            category:[]
        })

        const fetchTradeList = async () => {
            try{
                const response = await axios.get(BASEURL+'/trade_list');
                if(response.status == 200){

                    states.tradeList= response.data;
                    console.log( states.tradeList);
                }else{
                    alert("거래 내역을 가져오는데 실패하였습니다. ");
                }
            }catch(error){
                alert(error);
            }
        }

        const fetchCategory = async () => {
            try{
                const response = await axios.get(BASEURL+'/user_category');
                if(response.status == 200){
                    states.category = response.data.filter((item)=>{
                        return item.id=='ted'
                    });
                  //  console.log(states.category);
                }else{
                    alert("카테고리 내역을 가져오는데 실패하였습니다. ");
                }
            }catch(error){
                alert(error);
            }
        }

        onMounted(()=>{
            fetchTradeList();
            fetchCategory();
        })
       
        //provide('tradeList', computed(()=>states.tradeList));
      //  provide('actions', {fetchTradeList});


        return {states, fetchTradeList};
    }
}

</script>


<style>
    .main-color{
        background-color:#F1B73F
    }
    .btn-main{
        background-color:#F1B73F;

    }
    .btn-main:hover{
        background-color:#F1B73F;
    }
    
</style>