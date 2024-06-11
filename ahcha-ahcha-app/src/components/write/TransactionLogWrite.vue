<template>
    <div class="write">
        <div class="mb-3">
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="type1" name="type" value="income" v-model="state.type">
                <label class="form-check-label" for="type1">수입</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="type2" name="type" value="outcome" v-model="state.type">
                <label class="form-check-label" for="type2">지출</label><br/>
            </div>
        </div>

        <div class="mb-3">
            <label for="price" class="form-label">금액</label><br/>
            <input type="text" class="form-control text-end" id="price" :value="formattedPrice" @input="formatPrice"><br/>
        </div>
        
        <div class="mb-3">
        <label for="category" class="form-label">카테고리</label><br/>
            <select id="category" class="form-select" v-model="state.category">
                <option value="" disabled>카테고리를 선택해주세요</option>
                <option v-if="state.type==='income'" v-for="category in form.incomeCategories" :key="category">{{ category }}</option>
                <option v-if="state.type==='outcome'" v-for="category in form.outcomeCategories" :key="category">{{ category }}</option>
            </select><br/>
        </div>

        <div class="mb-3">
            <label for="date" class="form-label">날짜</label><br/>
            <input class="form-control" type="date" id="date" v-model="state.date"><br/>
        </div>

        <div class="mb-3">
            <label for="desc" class="form-label">내역</label><br/>
            <input type="text"  class="form-control" id="desc" v-model="state.desc"><br/>
        </div>
        
        <div class="mb-3">
            <label for="memo" class="form-label">메모</label><br/>
            <textarea type="text" class="form-control" id="memo" v-model="state.memo" rows="5"></textarea><br/>
        </div>

        <div class="mb-3 button">
            <button type="button" class="btn btn-warning" v-on:click="handleClick">입력하기</button>
        </div>
    </div>
</template>

<script setup>
    import { reactive, defineEmits, watch} from 'vue';

    const emit = defineEmits(['logChanged']);

    const form = reactive({
        incomeCategories:["월급", "환급금", "기타"],
        outcomeCategories:["식비", "교통비", "기타"]
    })

    const state = reactive({
        type: "",
        category: "",
        price: "",
        date: "",
        desc: "",
        memo: "",
        userid: ""
    });

    let formattedPrice = "";
    watch(
        ()=>state.price,
        (newValue) => {
            formattedPrice=newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    )


    // onMounted(async()=>{
    //     try{
    //         const response = await fetch('http://localhost:3001/category');
    //         const data = await response.json();
    //         if (data.length > 0) {
    //             form.incomeCategories = data[0]['income_category'];
    //             form.outcomeCategories = data[0]['outcome_category'];
    //         }
    //     } catch (error) {
    //         console.error('Failed to fetch data:', error)
    //     }
    // });

    const formatPrice = (event)=>{
        let value = event.target.value;
        value = value.replace(/,/g, '');
        state.price = value;
        event.target.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const submitForm = async function() {
        console.log('Current state : ', state);
        try{
            const response = await fetch('http://localhost:3001/trade_list',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(state)
            });
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const result = await response.json();

            console.log('Data saved successfully:', result);
            } 
            catch (error){
                console.error('Failed to save data:', error)

            }
    }

    const resetForm = () => {
        state.type = "";
        state.category = "";
        state.price = "";
        state.date = "";
        state.desc = "";
        state.memo = "";
    }

    const handleClick = async () => {
        await submitForm();
        emit('logChanged');
        resetForm();
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
</style>