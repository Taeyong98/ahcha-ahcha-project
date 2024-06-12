<template lang="">
    <div>
        <MyPageProfile v-bind:user="user" v-bind:image="user.user.image" />
        <hr />
        <MyPageEdit v-bind:user="user" @fetch-data="fetchData" />
    </div>
</template>
<script>
import MyPageEdit from '@/components/MyPage/MyPageEdit.vue';
import MyPageProfile from '@/components/MyPage/MyPageProfile.vue';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
export default {
    components: { MyPageEdit, MyPageProfile },
    setup() {
        const route = useRoute();
        const router = useRouter();
        // const id = route.params.id;
        const user = reactive({ user: {} });
        const fetchData = function () {
            axios
                .get(`http://localhost:3001/user_list/ted`)
                .then((res) => {
                    user.user = res.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchData();
        return { fetchData, user };
    },
};
</script>
<style lang=""></style>
