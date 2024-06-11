<template>
    <div class="div">
        <div class="div-5">
            <div class="div-6">마이 페이지</div>
            <div class="div-7">
                <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e2de9ce4592700165a2366da5689bc18a5603df4049bc0f87c07068608bd82bb?apiKey=1e5003343cd34debb6fe07d662da4802&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e2de9ce4592700165a2366da5689bc18a5603df4049bc0f87c07068608bd82bb?apiKey=1e5003343cd34debb6fe07d662da4802&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e2de9ce4592700165a2366da5689bc18a5603df4049bc0f87c07068608bd82bb?apiKey=1e5003343cd34debb6fe07d662da4802&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e2de9ce4592700165a2366da5689bc18a5603df4049bc0f87c07068608bd82bb?apiKey=1e5003343cd34debb6fe07d662da4802&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e2de9ce4592700165a2366da5689bc18a5603df4049bc0f87c07068608bd82bb?apiKey=1e5003343cd34debb6fe07d662da4802&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e2de9ce4592700165a2366da5689bc18a5603df4049bc0f87c07068608bd82bb?apiKey=1e5003343cd34debb6fe07d662da4802&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e2de9ce4592700165a2366da5689bc18a5603df4049bc0f87c07068608bd82bb?apiKey=1e5003343cd34debb6fe07d662da4802&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e2de9ce4592700165a2366da5689bc18a5603df4049bc0f87c07068608bd82bb?apiKey=1e5003343cd34debb6fe07d662da4802&"
                    class="img-3"
                />
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
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        // const id = route.params.id;
        const user = reactive({ user: {} });
        axios
            .get(`http://localhost:3001/user_list/ted`)
            .then((res) => {
                user.user = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
        return { user };
    },
};
</script>
<style scoped>
.div {
    background-color: var(--Primary-Base-White, #fff);
    display: flex;
    padding-bottom: 53px;
    flex-direction: column;
}
.div-2 {
    background-color: #fbe4a7;
    display: flex;
    width: 100%;
    gap: 20px;
    padding: 39px 62px;
}
@media (max-width: 991px) {
    .div-2 {
        max-width: 100%;
        flex-wrap: wrap;
        padding: 0 20px;
    }
}
.div-3 {
    color: var(--Primary-Base-Black, #000);
    text-align: center;
    flex-grow: 1;
    flex-basis: auto;
    margin: auto 0;
    font:
        700 25px/300% Lato,
        sans-serif;
}
.div-4 {
    display: flex;
    gap: 20px;
    justify-content: space-between;
}
.img {
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 45px;
    fill: var(--Primary-Base-Black, #000);
}
.img-2 {
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 45px;
}
.div-5 {
    align-self: center;
    display: flex;
    margin-top: 56px;
    width: 900px;
    max-width: 100%;
    flex-direction: column;
    padding: 0 20px;
}
@media (max-width: 991px) {
    .div-5 {
        margin-top: 40px;
    }
}
.div-6 {
    color: var(--Primary-Base-Black, #000);
    font:
        400 40px/150% Lemon,
        sans-serif;
}
@media (max-width: 991px) {
    .div-6 {
        max-width: 100%;
    }
}
.div-7 {
    border-radius: 16px;
    box-shadow: 0px 2px 16px 0px rgba(75, 75, 75, 0.15);
    background-color: var(--Primary-Base-White, #fff);
    align-self: end;
    display: flex;
    margin-top: 12px;
    width: 613px;
    max-width: 100%;
    flex-direction: column;
    padding: 12px 39px 64px;
}
@media (max-width: 991px) {
    .div-7 {
        padding: 0 20px;
    }
}
.img-3 {
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    width: 409px;
    border-radius: 50%;
    align-self: center;
    max-width: 100%;
}
.div-8 {
    display: flex;
    margin-top: 31px;
    gap: 8px;
}
@media (max-width: 991px) {
    .div-8 {
        flex-wrap: wrap;
    }
}
.div-9 {
    color: #a3a3a3;
    text-transform: uppercase;
    font:
        600 24px Manrope,
        sans-serif;
}
.div-10 {
    color: var(--Primary-Base-Black, #000);
    font:
        500 32px Manrope,
        sans-serif;
}
.div-11 {
    display: flex;
    margin-top: 16px;
    gap: 8px;
    white-space: nowrap;
}
@media (max-width: 991px) {
    .div-11 {
        flex-wrap: wrap;
        white-space: initial;
    }
}
.div-12 {
    color: #a3a3a3;
    text-transform: uppercase;
    font:
        600 24px Manrope,
        sans-serif;
}
.div-13 {
    color: var(--Primary-Base-Black, #000);
    font:
        500 32px Manrope,
        sans-serif;
}
.div-14 {
    display: flex;
    margin-top: 16px;
    gap: 8px;
    white-space: nowrap;
}
@media (max-width: 991px) {
    .div-14 {
        flex-wrap: wrap;
        white-space: initial;
    }
}
.div-15 {
    color: #a3a3a3;
    text-transform: uppercase;
    font:
        600 24px Manrope,
        sans-serif;
}
.div-16 {
    color: #010101;
    font:
        500 32px Manrope,
        sans-serif;
}
.div-17 {
    display: flex;
    margin-top: 16px;
    gap: 8px;
    white-space: nowrap;
}
@media (max-width: 991px) {
    .div-17 {
        flex-wrap: wrap;
        white-space: initial;
    }
}
.div-18 {
    color: #a3a3a3;
    text-transform: uppercase;
    font:
        600 24px Manrope,
        sans-serif;
}
.div-19 {
    color: #010101;
    font:
        500 32px Manrope,
        sans-serif;
}
.div-20 {
    display: flex;
    margin-top: 16px;
    gap: 8px;
    white-space: nowrap;
}
@media (max-width: 991px) {
    .div-20 {
        flex-wrap: wrap;
        white-space: initial;
    }
}
.div-21 {
    color: #a3a3a3;
    text-transform: uppercase;
    font:
        600 24px Manrope,
        sans-serif;
}
.div-22 {
    color: #010101;
    align-self: start;
    font:
        500 25px Manrope,
        sans-serif;
}
</style>
