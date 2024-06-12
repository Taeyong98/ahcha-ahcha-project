<template>
    <div>
        <SpendLessChallenge
                v-for="(challenge, index) in spendLessList"
                :key="index"
                :challenge="challenge"
            />
        </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import SpendLessChallenge from '../components/challenge/SpendLessChallenge.vue'

const challenges = ref([]);

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:3001/challenge_list');
        const data = await response.json();
        challenges.value = data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
});

const spendLessList = computed(()=>{
    return challenges.value.filter(challenge =>
        challenge.user_id==='ted' && challenge.challenge_type==='spend_less'
    )
});
</script>

<style scoped>

</style>
