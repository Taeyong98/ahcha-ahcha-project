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
                                                <input type="text" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <label>이름</label>
                                                <input type="text" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <label>이메일</label>
                                                <input type="email" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <label>휴대폰 번호</label>
                                                <input type="text" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <label>비밀번호 입력</label>
                                                <input type="password" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="d-flex flex-row align-items-center mb-4">
                                            <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                            <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                <label>비밀번호 다시 입력</label>
                                                <input type="password" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button
                                                type="button"
                                                data-mdb-button-init
                                                data-mdb-ripple-init
                                                class="btn btn-lg"
                                                style="background-color: #fbe4a7"
                                            >
                                                회원가입
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        class="img-fluid"
                                        alt="Sample image"
                                    />
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
import { reactive, ref } from 'vue';
export default {
    setup() {
        const user_info = reactive({
            id: '',
            user_name: '',
            user_nickname: '',
            phone_num: '',
            email: '',
            image: '',
            password: '',
        });
    },
};
</script>
<style lang=""></style>
