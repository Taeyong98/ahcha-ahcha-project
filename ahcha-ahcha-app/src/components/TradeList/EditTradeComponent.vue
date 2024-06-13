<template>
    <div class="write">
        <div class="mb-3">
            <form>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="incomeBtn" name="type" value="income"
                 v-model="stateCopy.type" :checked="stateCopy.type=='income'">
                <label class="form-check-label" for="incomeBtn">수입</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="outcomeBtn" name="type" value="outcome"
                 v-model="stateCopy.type" :checked="stateCopy.type=='outcome'">
                <label class="form-check-label" for="outcomeBtn">지출</label><br/>
            </div>
        </form>
        </div>

        <div class="mb-3">
            <label for="price" class="form-label">금액</label><br/>
            <input type="text" class="form-control text-end" 
            :value="stateCopy.price=='' ? '' : parseInt(stateCopy.price).toLocaleString()"
            @input="priceUpdate"
            id="price" 
            
            ><br/>
        </div>
        
        <div class="mb-3">
        <label for="category" class="form-label">카테고리</label><br/>
            <select id="category" class="form-select" v-model="stateCopy.category">
                <option value="" disabled>카테고리를 선택해주세요</option>
                <option v-if="stateCopy.type==='income'" v-for="category in form.incomeCategories" :key="category">{{ category }}</option>
                <option v-if="stateCopy.type==='outcome'" v-for="category in form.outcomeCategories" :key="category">{{ category }}</option>
            </select><br/>
        </div>

        <div class="mb-3">
            <label for="date" class="form-label">날짜</label><br/>
            <input class="form-control" type="date" id="date" v-model="stateCopy.date"><br/>
        </div>

        <div class="mb-3">
            <label for="desc" class="form-label">내역</label><br/>
            <input type="text"  class="form-control" id="desc" v-model="stateCopy.desc"><br/>
        </div>
        
        <div class="mb-3">
            <label for="memo" class="form-label">메모</label><br/>
            <textarea type="text" class="form-control" id="memo" v-model="stateCopy.memo" rows="5"></textarea><br/>
        </div>

        <div class="mb-3 button">
            <button type="button" class="btn btn-warning" v-on:click="$emit('submitForm', stateCopy)">변경하기</button>
        </div>
    </div>
</template>
<script>
import { reactive, defineEmits, watch} from 'vue';

export default{
    props:['state', 'incomeCategory', 'outcomeCategory'],
    emits:['submitForm'],
    setup(props){
        
        const stateCopy = reactive(JSON.parse(JSON.stringify(props.state)));
        
    
        const form = reactive({
            incomeCategories:props.incomeCategory,
            outcomeCategories:props.outcomeCategory
        });

        function priceUpdate(event){
            const value = event.target.value.replace(/,/g, '');
            stateCopy.price = value;
        }

        return {  form, stateCopy, priceUpdate };
    }
}

</script>
<style scoped>
     .write
    {
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        height: 100%;
        overflow-y: auto;
    }

    .button
    {
        float: right;
        margin-bottom: 2vh;
    }

    div{
        text-align: start;
    }

</style>