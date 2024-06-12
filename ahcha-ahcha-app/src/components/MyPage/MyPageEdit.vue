<template lang="">
    <div class="container-fluid mt-5 mb-5">
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
                    {{ file.name }}<img :src="`${filePreview}`" width="30" /><button type="button" class="ms-2">
                        프로필 변경
                    </button>
                </div>
            </div>
            <div>
                <button
                    class="me-5 mt-1 btn"
                    type="button"
                    @click="fileInput.click()"
                    style="display: flex; float: right"
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
                            placeholder="새로운 닉네임을 입력하세요"
                            name="uname"
                            required
                        />
                    </form>
                </div>
            </div>
            <div>
                <button class="me-5 mt-1 btn" type="button" style="display: flex; float: right">변경</button>
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
                            required
                        />
                        <input
                            type="password"
                            class="form-control mt-3"
                            id="pwd"
                            placeholder="새로운 비밀번호"
                            name="pswd"
                            required
                        />
                    </form>
                </div>
            </div>
            <div>
                <button class="me-5 mt-1 btn" type="button" style="display: flex; float: right">변경</button>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, ref } from 'vue';
export default {
    setup() {
        const file = ref(null);
        const filePreview = ref(null);
        const fileInput = ref(null);
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
            file.value = selectedFile;
            filePreview.value = URL.createObjectURL(selectedFile);
        };

        return {
            file,
            filePreview,
            fileInput,
            handleDragOver,
            handleDragLeave,
            handleDrop,
            handleFileChange,
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
