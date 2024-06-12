<template>
    <div>
        <button type="button" class="btn btn-warning btn-circle floating-button" data-bs-toggle="modal" data-bs-target="#transactionModal">+</button>
    
        <div class="modal fade" id="transactionModal" tabindex="-1" aria-labelledby="transactionModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered custom-modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="transactionModalLabel">기록</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <TransactionLogWrite @submitForm="handleSubmitForm" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TransactionLogWrite from './TransactionLogWrite.vue';
import {Modal} from 'bootstrap';
import {defineEmits} from 'vue';

const emit = defineEmits(['logChanged'])

const handleSubmitForm = () => {
    const closeButton = document.querySelector('#transactionModal .btn-close');
    if (closeButton) {
        closeButton.click();
    }
    emit('logChanged');
};
</script>

<style scoped>

.floating-button {
    position : fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.custom-modal-dialog {
    max-width: 80vw; /* 최대 너비를 뷰포트 너비의 80%로 설정 */
    width: 80vw;
}

.custom-modal-dialog .modal-content {
    height: 80vh; /* 높이를 뷰포트 높이의 80%로 설정 */
}

.modal-body {
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤 가능 */
}
</style>