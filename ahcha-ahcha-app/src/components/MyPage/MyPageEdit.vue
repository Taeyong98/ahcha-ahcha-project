<template lang="">
    <div class="container-fluid mb-5">
        <div class="container-md ms-5 me-5 container-box pt-5">
            <h1>내 정보 수정하기</h1>
            <hr />
            <div class="container mt-2">
                <h3 class="mt-3" style="display: inline-block">프로필 사진 변경</h3>
                <div
                    class="container-box2"
                    @dragover.prevent="handleDragOver"
                    @dragleave.prevent="handleDragLeave"
                    @drop.prevent="handleDrop"
                >
                    <div style="display: flex; justify-content: center; align-items: center">
                        <div>이미지 업로드</div>
                    </div>

                    <input type="file" multiple ref="fileInput" @change="handleFileChange" style="display: none" />
                </div>
                <div v-if="file" class="ms-1">
                    {{ file.name }}<img :src="`${filePreview}`" width="30" /><button
                        type="button"
                        class="ms-2 btn"
                        style="background-color: #fbe4a7"
                        @click="changeProfile"
                    >
                        프로필 변경
                    </button>
                </div>
            </div>
            <div>
                <button
                    class="me-5 mt-2 btn"
                    type="button"
                    @click="fileInput.click()"
                    style="display: flex; float: right; background-color: #fbe4a7"
                >
                    파일 첨부
                </button>
            </div>
            <div class="container mt-2">
                <h3 class="mt-3" style="display: flex; width: 200px; float: left">
                    <label for="uname" class="form-label">닉네임 변경</label>
                </h3>

                <div style="display: flex; justify-content: right; align-items: center; float: right; margin-right: 40">
                    <form class="was-validated mt-3">
                        <input
                            type="text"
                            class="form-control"
                            id="uname"
                            :placeholder="user.user.user_nickname"
                            name="uname"
                            v-model="newNickname"
                            required
                        />
                    </form>
                </div>
            </div>
            <div>
                <button
                    class="me-5 mt-1 btn"
                    type="button"
                    style="display: flex; float: right; background-color: #fbe4a7"
                    @click="changeNickname"
                >
                    변경
                </button>
            </div>
            <div class="container mt-2">
                <h3 class="mt-3" style="display: flex; width: 200px; float: left">
                    <label for="uname" class="form-label">비밀번호 변경</label>
                </h3>

                <div style="display: flex; justify-content: right; align-items: center; float: right; margin-right: 40">
                    <form class="was-validated mt-3">
                        <input
                            type="password"
                            class="form-control"
                            id="pwd"
                            placeholder="현재 비밀번호"
                            name="pswd"
                            v-model="currentPassword"
                            required
                        />
                        <input
                            type="password"
                            class="form-control mt-3"
                            id="pwd2"
                            placeholder="새로운 비밀번호"
                            name="pswd"
                            v-model="newPassword"
                            required
                        />
                    </form>
                </div>
            </div>
            <div>
                <button
                    class="me-5 mt-1 btn"
                    type="button"
                    style="display: flex; float: right; background-color: #fbe4a7"
                    @click="changePassword"
                >
                    변경
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import {ref} from 'vue';
export default {
    props: ['user'],
    emits: ["fetchData"],
    setup(props,context) {
        const file = ref(null);
        const filePreview = ref(null);
        const fileInput = ref(null);
        const imgBase64 = ref(null);
        const newNickname = ref('');
        const currentPassword = ref('');
        const newPassword = ref('');
        const handleDragOver = (event) => {
            event.currentTarget.classList.add('drag-over');
        };

        const handleDragLeave = (event) => {
            event.currentTarget.classList.remove('drag-over');
        };

        const handleDrop = (event) => {
            event.currentTarget.classList.remove('drag-over');
            const files = event.dataTransfer.files;
            if (files.length > 1) {
                alert('하나의 파일만 올려주세요.');
                return;
            }
            handleFile(files[0]);
        };

        const handleFileChange = (event) => {
            const files = event.target.files;
            if (files.length > 1) {
                alert('하나의 파일만 올려주세요.');
                return;
            }
            handleFile(files[0]);
        };

        const handleFile = (selectedFile) => {
            if (!selectedFile.type.startsWith('image/')) {
                alert('이미지 파일만 올려주세요.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result.split(',')[1];
                imgBase64.value = base64String;
            };
            reader.readAsDataURL(selectedFile);

            file.value = selectedFile;
            filePreview.value = URL.createObjectURL(selectedFile);
        };

        const changeProfile = () => {
            axios
                .put('http://localhost:3001/user_list/ted', {
                    id: props.user.user.id,
                    user_name: props.user.user.user_name,
                    user_nickname: props.user.user.user_nickname,
                    phone_num: props.user.user.phone_num,
                    email: props.user.user.email,
                    image: imgBase64.value,
                    password: props.user.user.password,
                })
                .then((res) => {
                    if (res.status == 200) {
                        alert('적용 완료되었습니다.');
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    file.value = null;
                    context.emit("fetchData");
                });
        };

        const changeNickname = () => {
            if(!newNickname.value){
                alert("닉네임을 입력해주세요!")
                return;
            }
            axios
                .put('http://localhost:3001/user_list/ted', {
                    id: props.user.user.id,
                    user_name: props.user.user.user_name,
                    user_nickname: newNickname.value,
                    phone_num: props.user.user.phone_num,
                    email: props.user.user.email,
                    image: props.user.user.image,
                    password: props.user.user.password,
                })
                .then((res) => {
                    if (res.status == 200) {
                        alert('적용 완료되었습니다.');
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    newNickname.value = ""
                    context.emit("fetchData");
                });
        };
        const changePassword = () => {
            if (currentPassword.value != props.user.user.password) {
                alert('현재 비밀번호가 다릅니다!');
                return;
            }
            if(!newPassword.value){
                alert("새로운 비밀번호를 입력해주세요!")
                return;
            }
            axios
                .put('http://localhost:3001/user_list/ted', {
                    id: props.user.user.id,
                    user_name: props.user.user.user_name,
                    user_nickname: props.user.user.user_nickname,
                    phone_num: props.user.user.phone_num,
                    email: props.user.user.email,
                    image: props.user.user.image,
                    password: newPassword.value,
                })
                .then((res) => {
                    if (res.status == 200) {
                        alert('적용 완료되었습니다.');
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    currentPassword.value = ""
                    newPassword.value = ""
                    context.emit("fetchData");
                });
        };

        return {
            file,
            filePreview,
            fileInput,
            currentPassword,
            newNickname,
            newPassword,
            handleDragOver,
            handleDragLeave,
            handleDrop,
            handleFileChange,
            changeProfile,
            changeNickname,
            changePassword,
        };
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
.container-box2 {
    border-radius: 16px;
    box-shadow: 0px 2px 16px 0px rgba(75, 75, 75, 0.15);
    display: flex;
    float: right;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    width: 60%;
    height: 100px;
}
</style>
