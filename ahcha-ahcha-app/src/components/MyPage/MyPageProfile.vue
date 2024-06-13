<template>
    <div class="container-md ms-5 me-5 container-box pt-5">
        <div class="container">
            <h1>마이 페이지</h1>
            <div class="card p-3" style="justify-content: center; align-items: center">
                <div style="border: 2px solid beige; padding: 7px; border-radius: 70%; background-color: #fbe4a7">
                    <img v-if="image == ''" loading="lazy" src="../../assets/defaultProfile.png" class="img-3" />
                    <img v-else loading="lazy" :src="`data:image/png;base64, ${image}`" class="img-3" />
                </div>

                <section class="user-info">
                    <div class="user-detail">
                        <h2 class="label">유저 ID</h2>
                        <p class="info">{{ user.user.id }}</p>
                    </div>
                    <div class="user-detail">
                        <h2 class="label">이름</h2>
                        <p class="info">{{ user.user.user_name }}</p>
                    </div>
                    <div class="user-detail">
                        <h2 class="label">연락처</h2>
                        <p class="info">{{ user.user.phone_num }}</p>
                    </div>
                    <div class="user-detail">
                        <h2 class="label">닉네임</h2>
                        <p class="info">{{ user.user.user_nickname }}</p>
                    </div>
                    <div class="user-detail">
                        <h2 class="label">이메일</h2>
                        <p class="info">{{ user.user.email }}</p>
                    </div>
                </section>
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
.img-3 {
    width: 150px;
    height: 150px;
    border-radius: 70%;
    overflow: hidden;
}
.div1 {
    width: 50px;
}
.user-info {
    display: flex;
    max-width: 600px;
    flex-direction: column;
    align-content: center;
}

.user-detail {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    gap: 40px;
    padding: 0 20px;
}

.label {
    color: #a3a3a3;
    text-transform: uppercase;
    font: 600 24px sans-serif;
}

.info {
    color: var(--Primary-Base-Black, #000);
    font: 500 20px sans-serif;
}

@media (max-width: 991px) {
    .user-detail {
        flex-wrap: wrap;
        white-space: initial;
    }
}
</style>
