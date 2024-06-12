<template lang="">
    <div>
        <MyPageProfile />
        <hr />
        <MyPageEdit />
    </div>
</template>
<script>
import MyPageEdit from '@/components/MyPage/MyPageEdit.vue';
import MyPageProfile from '@/components/MyPage/MyPageProfile.vue';
import axios from 'axios';
export default {
    components: { MyPageEdit, MyPageProfile },
};
</script>
<style lang=""></style>
