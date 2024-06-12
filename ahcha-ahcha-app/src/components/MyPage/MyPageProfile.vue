<template>
    <div class="container-md ms-5 me-5 container-box pt-5">
        <div class="container">
            <h1>마이 페이지</h1>
            <div class="card">
                <img v-if="image == ''" loading="lazy" src="../../assets/defaultProfile.png" class="img-3" />
                <img v-else loading="lazy" :src="`data:image/png;base64, ${image}`" class="img-3" />
                <div class="div-8">
                    <div class="div-9">유저 ID</div>
                    <div class="div-10">{{ user.user.id }}</div>
                </div>
                <div class="div-11">
                    <div class="div-12">이름</div>
                    <div class="div-13">{{ user.user.user_name }}</div>
                </div>
                <div class="div-14">
                    <div class="div-15">연락처</div>
                    <div class="div-16">{{ user.user.phone_num }}</div>
                </div>
                <div class="div-17">
                    <div class="div-18">닉네임</div>
                    <div class="div-19">{{ user.user.user_nickname }}</div>
                </div>
                <div class="div-20">
                    <div class="div-21">이메일</div>
                    <div class="div-22">{{ user.user.email }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, ref, toRef, toRefs, watch, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
    props: {
        user: {
            type: Object,
        },
        image: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
    },
};
</script>
<style scoped>
.container-box {
    border-radius: 16px;
    box-shadow: 0px 2px 16px 0px rgba(75, 75, 75, 0.15);
    background-color: var(--Primary-Base-White, #fff);
    align-self: end;
    display: flex;
    margin-top: 12px;
    width: auto;
    max-width: 100%;
    flex-direction: column;
    padding: 12px 39px 64px;
}
</style>
