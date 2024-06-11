<template>
    <TradeList 
               >
    </TradeList>

   <!-- <TransactionLogWrite @logChanged="fetchTradeList"></TransactionLogWrite> -->
</template>


<script>
import TradeList from '../components/TradeList/TradeList.vue'
import TransactionLogWrite from '@/components/write/TransactionLogWrite.vue';
import { ref, computed, reactive, onMounted } from 'vue';


export default{
    components:{
        TradeList,
        //우정님 모달 추가
        TransactionLogWrite
    },
    setup(){
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