<template>
    <div class="write">
        <div class="mb-3">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="type1" name="challenge_type" value="saving" v-model="state.challenge_type">
                <label class="form-check-label" for="type1">절약 챌린지</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="type2" name="challenge_type" value="spend_less" v-model="state.challenge_type">
                <label class="form-check-label" for="type2">저축 챌린지</label>
            </div>
        </div>

        <div class="mb-3">
            <label for="title" class="form-label">챌린지 제목</label>
            <input type="text" class="form-control" id="title" v-model="state.title">
        </div>

        <div class="mb-3">
            <label for="goal" class="form-label">목표금액</label>
            <input type="text" class="form-control text-end" id="goal" :value="formattedGoal" @input="formatGoal">
        </div>

        <div class="mb-3">
            <label for="from_date" class="form-label">시작일</label>
            <input class="form-control" type="date" id="from_date" v-model="state.from_date">
        </div>

        <div class="mb-3">
            <label for="to_date" class="form-label">목표일</label>
            <input class="form-control" type="date" id="to_date" v-model="state.to_date">
        </div>

        <div class="mb-3 button">
            <button type="button" class="btn btn-warning" v-on:click="handleClick">입력하기</button>
        </div>
    </div>
</template>

<script setup>
import { reactive, defineEmits, watch } from 'vue';

const emit = defineEmits(['submitForm']);

const state = reactive({
    user_id:"ted",
    challenge_type: "",
    title: "",
    goal: "",
    from_date: "",
    to_date: ""
});

let formattedGoal = "";
watch(
    () => state.goal,
    (newValue) => {
        formattedGoal = newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
);

const formatGoal = (event) => {
    let value = event.target.value;
    value = value.replace(/,/g, '');
    state.goal = value;
    event.target.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const submitForm = async function() {
    console.log('Current state : ', state);
    try {
        const response = await fetch('http://localhost:3001/challenge_list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Data saved successfully:', result);
    } catch (error) {
        console.error('Failed to save data:', error);
    }
};

const resetForm = () => {
    state.challenge_type = "";
    state.title = "";
    state.goal = "";
    state.from_date = "";
    state.to_date = "";
};

const handleClick = async () => {
    await submitForm();
    emit('submitForm');
    resetForm();
};
</script>

<style scoped>
.write {
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: 100%;
    overflow-y: auto;
}

.button {
    float: right;
    margin-bottom: 2vh;
}
</style>
