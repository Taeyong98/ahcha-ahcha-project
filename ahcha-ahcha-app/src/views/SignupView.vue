<template lang="">
    <section style="background-color: #eee">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black mt-5 mb-5" style="border-radius: 25px">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">회원 가입</p>

                                    <form class="mx-1 mx-md-4">
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <label>ID</label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" v-model="user_info.id" />
                                                    <button
                                                        :disabled="idChecked"
                                                        type="button"
                                                        data-mdb-button-init
                                                        data-mdb-ripple-init
                                                        class="btn btn-lg"
                                                        style="background-color: #fbe4a7"
                                                        @click="checkId"
                                                    >
                                                        중복확인
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <label>비밀번호 입력</label>
                                                <input
                                                    type="password"
                                                    class="form-control"
                                                    v-model="user_info.password"
                                                />
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <label>비밀번호 다시 입력</label>
                                                <input type="password" class="form-control" v-model="passwordCf" />
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <label>이름</label>
                                                <input type="text" class="form-control" v-model="user_info.user_name" />
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <label>닉네임</label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    v-model="user_info.user_nickname"
                                                />
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <label>이메일</label>
                                                <input type="email" class="form-control" v-model="user_info.email" />
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <label>휴대폰 번호</label>
                                                <input type="text" class="form-control" v-model="user_info.phone_num" />
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button
                                                type="button"
                                                data-mdb-button-init
                                                data-mdb-ripple-init
                                                class="btn btn-lg"
                                                style="background-color: #fbe4a7"
                                                @click="signUp"
                                            >
                                                회원가입
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div
                                    class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2 justify-content-center"
                                >
                                    <img src="@/assets/login/로고.png" class="logo-image" alt="Sample image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup() {
        const router = useRouter();
        const user_info = reactive({
            id: '',
            user_name: '',
            user_nickname: '',
            phone_num: '',
            email: '',
            image: '',
            password: '',
        });
        const idChecked = ref(false);
        const passwordCf = ref('');

        watch(
            () => user_info.id,
            () => {
                idChecked.value = false;
            },
        );
        const checkId = async function () {
            try {
                if (user_info.id == '') {
                    alert('아이디를 입력하세요.');
                    return;
                }
                let response = await axios.get(`http://localhost:3001/user_list`);
                let tempUser = response.data.find((u) => {
                    return u.id == user_info.id;
                });
                console.log(tempUser);
                if (tempUser != undefined) {
                    alert('이미 존재하는 아이디입니다.');
                    return;
                }
                alert('사용가능한 아이디입니다.');
                idChecked.value = true;
            } catch (err) {
                console.log(err);
            } finally {
            }
        };

        const signUp = function () {
            if (
                !user_info.id ||
                !user_info.user_name ||
                !user_info.user_nickname ||
                !user_info.phone_num ||
                !user_info.email ||
                !user_info.password
            ) {
                alert('빈칸을 모두 기입해주세요.');
                return;
            }
            if (!idChecked.value) {
                alert('아이디 중복확인을 먼저 해주세요.');
                return;
            }

            if (user_info.password != passwordCf.value) {
                alert('다시 입력한 비밀번호가 다릅니다.');
                return;
            }

            axios
                .post('http://localhost:3001/user_category', {
                    id: user_info.id,
                    income: ['월급', '용돈', '환급금', '이자', '기타'],
                    outcome: ['식비', '교통', '문화생활', '의료', '경조사', '통신', '기타'],
                })
                .then((res) => {
                    if (res.status != 201) {
                        return;
                    }
                });

            axios.post('http://localhost:3001/user_list', user_info).then((res) => {
                if (res.status != 201) {
                    return;
                }
                alert('회원가입이 완료 되었습니다.');
                router.push('/ahcha/login');
            });
        };

        return { user_info, checkId, passwordCf, signUp, idChecked };
    },
};
</script>
<style scoped>
.logo-image {
    max-width: 90%; /* 이미지의 최대 너비를 부모 컨테이너 너비로 제한 */
    height: auto; /* 이미지 비율을 유지하며 높이를 자동 조정 */
}
</style>
