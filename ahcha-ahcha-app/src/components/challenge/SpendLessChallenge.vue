<template>
    <div :class="containerClass">
        <h5 class="header">
            {{challenge.title}}
            <span :class="remainingDaysClass">{{ remainingDaysText }}</span>
        </h5>
        목표 금액 : <span :class="textClass">{{ formatCurrency(challenge.goal) }}</span> <br/>
        시간 기한 : <span :class="textClass">{{ challenge.from_date }}</span> <br/>
        목표 기한 : <span :class="textClass">{{ challenge.to_date }}</span> <br/>
        <hr>
        현재까지 <span :class="spentClass">{{ formatCurrency(result.currentSpent) }}원</span> 사용했습니다.<br>
        남은기간(<span :class="remainingDaysClass">{{ result.remainingDays }}일</span>) 동안 <span :class="remainingAmountClass">{{ formatCurrency(result.remainingAmount) }}원</span> 사용할 수 있습니다.
        
        <div class="progress-bar-container">
            <div :class="progressBarClass" :style="{ width: progressBarWidth + '%' }"></div>
        </div>
        <p :class="textClass">실패확률: {{ progressBarWidth.toFixed(2) }}%</p>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { differenceInDays, parseISO, isWithinInterval } from 'date-fns';

const props = defineProps({
    challenge: Object
});

const result = ref({
    currentSpent: 0,
    remainingDays: 0,
    remainingAmount: 0
});

const progressBarWidth = ref(0);

const calculateRemainingDays = (toDate) => {
    const today = new Date();
    return differenceInDays(parseISO(toDate), today)+1;
};

const calculateRemainingAmount = (goal, currentSpent) => {
    return goal - currentSpent;
};

const calculateCurrentSpent = (trades, challenge) => {
    return trades
    .filter(trade =>
        trade.user_id === challenge.userid &&
        trade.type === 'outcome' &&
        isWithinInterval(parseISO(trade.date), {
            start: parseISO(challenge.from_date),
            end: parseISO(challenge.to_date)
        })
    )
    .reduce((sum, trade) => sum + trade.price, 0);
};

const calculateProgress = (currentSpent, goal) => {
    if (goal === 0) return 0;
    return (currentSpent / goal) * 100;
};

const formatCurrency = (value) => {
    return value.toLocaleString('ko-KR');
};

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:3001/trade_list');
        const trades = await response.json();

        result.value.currentSpent = calculateCurrentSpent(trades, props.challenge);
        result.value.remainingDays = calculateRemainingDays(props.challenge.to_date);
        result.value.remainingAmount = calculateRemainingAmount(props.challenge.goal, result.value.currentSpent);
        progressBarWidth.value = calculateProgress(result.value.currentSpent, props.challenge.goal);

    } catch (error) {
        console.error('Failed to fetch trade data:', error);
    }
});

const isFailed = computed(() => progressBarWidth.value > 100);

const containerClass = computed(() => ({
    container: true,
    'container-failed': isFailed.value
}));

const textClass = computed(() => ({
    'text-failed': isFailed.value
}));

const spentClass = computed(() => ({
    spent: true,
    'text-failed': isFailed.value
}));

const remainingDaysClass = computed(() => ({
    'remaining-days-header': true,
    'text-failed': isFailed.value
}));

const remainingAmountClass = computed(() => ({
    'remaining-amount': true,
    'text-failed': isFailed.value
}));

const progressBarClass = computed(() => ({
    'progress-bar': true,
    'progress-bar-failed': isFailed.value
}));

const remainingDaysText = computed(() => isFailed.value ? '실패' : `D-${result.value.remainingDays}`);
</script>

<style scoped>
.progress-bar-container {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 50px;
}

.progress-bar {
    height: 20px;
    background-color: #FF6347;
    width: 0;
    transition: width 0.3s ease-in-out;
}

.progress-bar-failed {
    background-color: #a9a9a9;
}

.progress-text {
    text-align: right;
    font-size: 0.9em;
    color: #999;
    margin-top: 5px;
}

.container {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 20px;
    border: none;
}

.container-failed {
    background-color: #f0f0f0;
}

h5 {
    margin: 0 0 10px 0;
    font-weight: bold;
}

hr {
    margin: 10px 0;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px 0;
    font-weight: bold;
}

.remaining-days-header {
    margin-left: 2px;
    color: #FF6347;
    font-size: medium;
}

.spent {
    color: #FF6347;
    white-space: nowrap;
    display: inline-block;
    font-weight: bold;
}

.remaining-days,
.remaining-amount {
    color: #4682B4;
    font-weight: bold;
}

.text-failed {
    color: #a9a9a9;
}
</style>
