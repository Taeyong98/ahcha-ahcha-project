<template lang="">
    <div class="mt-5 d-flex justify-content-center" >
        <form>
            <div class="mb-1">
                <input type="text" class="form-control" v-model="id_input" maxlength="14" placeholder="ID"/>
            </div>
            <div class="mb-3">
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="pw_input" maxlength="14" placeholder="Password"/>
            </div>
            <div class="mb-3 form-check">
                
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        
        </form>
    </div>
</template>
<script>
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default {
    setup() {
        const router = useRouter();
        const route = useRoute();

        const id_input = ref("");
        const pw_input = ref("");

        return{id_input, pw_input};
    },
};
</script>
<style lang=""></style>
