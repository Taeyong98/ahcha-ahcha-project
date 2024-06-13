<template>
    <div class="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <div class="row justify-content-center align-items-center w-100">
            <div class="col-sm-6 item text-end d-flex justify-content-center align-items-center">
                <img src="@/assets/login/로고.png" alt="로고이미지" class="logo-image" />
            </div>
            <form class="col-sm-6 item text-start d-flex flex-column justify-content-center align-items-start">
                <h5>LOGIN</h5>
                <div class="mb-3" style="width: 50%">
                    <label for="id">ID</label>
                    <input
                        type="text"
                        id="id"
                        class="form-control"
                        v-model="id_input"
                        maxlength="14"
                        placeholder="ID"
                    />
                </div>
                <div class="mb-3" style="width: 50%">
                    <label for="exampleInputPassword1">PASSWORD</label>
                    <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        v-model="pw_input"
                        maxlength="14"
                        placeholder="Password"
                    />
                </div>
                <div class="mb-3 form-check"></div>
                <button type="button" class="btn btn-warning" @click="login">로그인</button>
                <button type="button" class="btn" @clcik="signUp">회원가입</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
export default {
    setup() {
        const router = useRouter();
        const route = useRoute();
        const id_input = ref('');
        const pw_input = ref('');

        const login = async function () {
            sessionStorage.setItem('userid', '');
            try {
                let response = await axios.get(`http://localhost:3001/user_list`);
                let tempUser = response.data.find((u) => {
                    return u.id == id_input.value;
                });

                if (tempUser == null) {
                    alert('해당하는 id가 없습니다.');
                    return;
                }
                if (tempUser.password != pw_input.value) {
                    alert('password가 올바르지 않습니다!');
                    return;
                }

                sessionStorage.setItem('userid', tempUser.id);
                let path = route.query.to;
                if (path == undefined) {
                    path = '/ahcha';
                }
                router.push({ path: path });
            } catch (err) {
                console.log(err);
            } finally {
                id_input.value = '';
                pw_input.value = '';
            }
        };

        const signUp = function () {
            router.push('/ahcha/signup');
        };

        return { id_input, pw_input, login, signUp };
    },
};
</script>

<style scoped>
.logo-image {
    max-width: 70%; /* 이미지의 최대 너비를 부모 컨테이너 너비로 제한 */
    height: auto; /* 이미지 비율을 유지하며 높이를 자동 조정 */
    padding: 10%;
}

.form-control {
    width: 100%; /* 입력 필드 너비를 줄여서 설정 */
    max-width: 100%;
}

h5 {
    font-weight: bold;
    font-size: x-large;
    margin-bottom: 20px;
}

.item {
    max-width: 60%; /* 아이템의 최대 너비를 60%로 설정 */
    display: flex; /* 플렉스박스로 설정하여 자식 요소들을 정렬 */
    flex-direction: column; /* 아이템 내 요소들을 세로로 정렬 */
    align-items: center; /* 아이템 내 요소들을 가로로 가운데 정렬 */
    justify-content: center; /* 아이템 내 요소들을 세로로 가운데 정렬 */
}

.item.form {
    align-items: flex-start; /* 폼 요소를 왼쪽 정렬 */
}

.btn {
    width: 15%; /* 버튼 너비를 80%로 설정 */
}
</style>
