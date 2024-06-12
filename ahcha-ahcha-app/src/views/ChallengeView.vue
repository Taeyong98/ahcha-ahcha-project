<template>
    
    <div class="mt-3">
        
        <button type="button" class="btn btn-warning mb-3" data-bs-toggle="modal" data-bs-target="#transactionModal">목표 추가하기</button>
        <div class="row justify-content-center">
            <div class="col-md-6 d-flex flex-column align-items-center">
                <SpendLessChallenge
                        v-for="(challenge, index) in spendLessList"
                        :key="index"
                        :challenge="challenge"
                />
            </div>
            <div class="col-md-6 d-flex flex-column align-items-center">
                <SavingChallenge
                        v-for="(challenge, index) in savingList"
                        :key = "index"
                        :challenge="challenge"
                />
            </div>
        </div>

        <!-- 입력 모달 -->
        <div class="modal fade" id="transactionModal" tabindex="-1" aria-labelledby="transactionModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered custom-modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <!-- <h5 class="modal-title" id="transactionModalLabel">기록</h5> -->
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        입력 컴포넌트 추가
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import SpendLessChallenge from '../components/challenge/SpendLessChallenge.vue'
import SavingChallenge from '../components/challenge/SavingChallenge.vue'

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

const savingList = computed(()=>{
    return challenges.value.filter(challenge=>
        challenge.user_id==='ted' && challenge.challenge_type==='saving'
    )
});
</script>

<style scoped>

.mt-3{
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100%;
}

.row{
    width:70%;
}


</style>
