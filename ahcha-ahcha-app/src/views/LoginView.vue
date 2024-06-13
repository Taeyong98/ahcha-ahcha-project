<template lang="">
    <div class="mt-5 d-flex justify-content-center">
        <form>
            <div class="mb-1">
                <input type="text" class="form-control" v-model="id_input" maxlength="14" placeholder="ID" />
            </div>
            <div class="mb-3">
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
            <button type="button" class="m-1 btn" style="background-color: #fbe4a7" @click="login">로그인</button>
            <button type="button" class="m-1 btn" style="background-color: #fbe4a7" @click="signUp">회원가입</button>
        </form>
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
<style lang=""></style>
