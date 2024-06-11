<template>
    <TradeList v-bind:tradeList="states.tradeList"></TradeList>
    <!-- <friendship @listChanged="fetchTradeList"></friendship> -->
</template>


<script>
import TradeList from '../components/TradeList/TradeList.vue'
import { ref, computed, reactive, provide } from 'vue';
import axios from 'axios';

export default{
    components:{
        TradeList,
        //우정님 모달 추가

    },
    setup(){
        const BASEURL = "http://localhost:3001";
        const states = reactive({
            tradeList:[]
        })

        const fetchTradeList = async () => {
            try{
                const response = await axios.get(BASEURL+"/trade_list");
                if(response.status == 200){
                    states.tradeList = response.data;
                    console.log(states.tradeList);
                }else{
                    alert("거래 내역을 가져오는데 실패하였습니다. ");
                }
            }catch(error){
                alert(error);
            }
        }

        fetchTradeList();

        //provide('tradeList', computed(()=>states.tradeList));
        provide('actions', {fetchTradeList});


        return {states};
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