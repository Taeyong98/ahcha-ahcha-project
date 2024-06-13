<template>
    
    <div class="mt-3">
        
        <button type="button" class="btn btn-warning mb-3" data-bs-toggle="modal" data-bs-target="#transactionModal">목표 추가하기</button>
        <div class="row justify-content-center">
            <div class="col-md-6 d-flex flex-column align-items-center">
                <h4>🧡절약 챌린지🧡</h4>
                <SpendLessChallenge
                        v-for="(challenge, index) in spendLessList"
                        :key="index"
                        :challenge="challenge"
                        @submitForm="reloadChallenges"
                />
            </div>
            <div class="col-md-6 d-flex flex-column align-items-center">
                <h4>🧡저축 챌린지🧡</h4>
                <SavingChallenge
                        v-for="(challenge, index) in savingList"
                        :key = "index"
                        :challenge="challenge"
                        @submitForm="reloadChallenges"
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
                        <ChallengeLogWrite @submitForm="reloadChallenges"></ChallengeLogWrite>
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
import ChallengeLogWrite from '../components/challenge/ChallengeLogWrite.vue'

let userid = sessionStorage.getItem('userid');

const challenges = ref([]);

const fetchChallenges = async () => {
    try{
        const response = await fetch('http://localhost:3001/challenge_list');
        const data = await response.json();
        challenges.value = data;
    }
    catch(error){
        console.error(error);
    }
}

onMounted(fetchChallenges);


const spendLessList = computed(()=>{
    return challenges.value.filter(challenge =>
        challenge.user_id===userid && challenge.challenge_type==='spend_less'
    )
});

const savingList = computed(()=>{
    return challenges.value.filter(challenge=>
        challenge.user_id===userid && challenge.challenge_type==='saving'
    )
});

const reloadChallenges = async () => {
    try {
        const response = await fetch('http://localhost:3001/challenge_list');
        const data = await response.json();
        challenges.value = data;

        const closeButton = document.querySelector('#transactionModal .btn-close');
        if (closeButton) {
            closeButton.click();
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};
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

.custom-modal-dialog {
    max-width: 50vw; /* 최대 너비를 뷰포트 너비의 80%로 설정 */
    width: 50vw;
}
.btn{
    background-color: #ffffff;
    border:#FBE4A7 solid 5px;
}


.modal-body {
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤 가능 */
}

h4{
    font-weight: bolder;
}
</style>
