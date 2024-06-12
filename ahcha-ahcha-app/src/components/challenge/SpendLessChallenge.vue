<template>
    <div>
        <h5>소비 줄이기</h5>
        목표 금액 : {{ challenge.goal }} <br/>
        시간 기한 : {{ challenge.from_date }} <br/>
        목표 기한 : {{ challenge.to_date }} <br/>
        <hr>
        현재까지 {{result.currentSpent}}원 사용했습니다.<br>
        남은기간({{result.remainingDays}}일) 동안 {{result.remainingAmount}}원 사용할 수 있습니다.
        
        <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: progressBarWidth + '%' }"></div>
        </div>
        <p>진행률: {{ progressBarWidth.toFixed(2) }}%</p>
    </div>
</template>

<script setup>
import { watchEffect, ref, onMounted } from 'vue';
import {differenceInDays, parseISO, isWithinInterval} from 'date-fns'

const props = defineProps({
    challenge: Object
});

const result = ref({
    currentSpent:0,
    remainingDays:0,
    remainingAmount:0
});

const progressBarWidth = ref(0);

const calculateRemainingDays = (toDate) => {
    const today = new Date();
    return differenceInDays(parseISO(toDate), today)
};

const calculateRemainingAmount = (goal, currentSpent) => {
    return goal - currentSpent;
};

const calculateCurrentSpent = (trades, challenge) => {
    return trades
    .filter(trade =>
        trade.user_id === challenge.user_id &&
        trade.type === 'outcome' &&
        isWithinInterval(parseISO(trade.date), {
            start: parseISO(challenge.from_date),
            end: parseISO(challenge.to_date)
        })
    )
    .reduce((sum, trade) => sum + trade.price, 0);
};

const calculateProgress = (currentSpent, goal)=>{
    if(goal === 0) return 0;
    return (currentSpent/goal)*100;
}

onMounted(async() => {
    try{
        const response = await fetch('http://localhost:3001/trade_list');
        const trades = await response.json();

        result.value.currentSpent = calculateCurrentSpent(trades, props.challenge);
        result.value.remainingDays = calculateRemainingDays(props.challenge.to_date);   
        result.value.remainingAmount = calculateRemainingAmount(props.challenge.goal, result.value.currentSpent);
        progressBarWidth.value = calculateProgress(result.value.currentSpent, props.challenge.goal);

    }catch(error){
        console.error('Failed to fetch trade data:', error);
    }
});

</script>

<style scoped>
.progress-bar-container {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 10px;
}

.progress-bar {
    height: 20px;
    background-color: #76c7c0;
    width: 0;
    transition: width 0.3s ease-in-out;
}
</style>