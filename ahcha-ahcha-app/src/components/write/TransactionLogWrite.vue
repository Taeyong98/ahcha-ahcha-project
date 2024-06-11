<template>
    <div class="write">
        <h2>기록</h2>
        <hr/>
        <div>
            <div>
            <input type="radio" id="type1" name="type" value="income" v-model="state.type">
            <label for="type1">수입</label>
            </div>
            <input type="radio" id="type2" name="type" value="outcome" v-model="state.type">
            <label for="type2">지출</label><br/>
        </div>

        <div>
            <label for="price">금액</label><br/>
            <input type="number" id="price" v-model="state.price"><br/>
        </div>
        
        <div>
        <label for="category">카테고리</label><br/>
            <select id="category" v-model="state.category">
                <option value="" disabled>카테고리를 선택해주세요</option>
                <option v-if="state.type==='income'" v-for="category in form.incomeCategories" :key="category">{{ category }}</option>
                <option v-if="state.type==='outcome'" v-for="category in form.outcomeCategories" :key="category">{{ category }}</option>
            </select><br/>
        </div>

        <div>
            <label for="date">날짜</label><br/>
            <input type="date" id="date" v-model="state.date"><br/>
        </div>

        <div>
            <label for="desc">내역</label><br/>
            <input type="text" id="desc" v-model="state.desc"><br/>
        </div>
        
        <div>
            <label for="memo">메모</label><br/>
            <input type="text" id="memo" v-model="state.memo"><br/>
        </div>

        <div>
            <button type="button" v-on:click="handleClick">입력하기</button>
        </div>
    </div>
</template>

<script setup>
    import { reactive} from 'vue';
    import { defineEmits } from 'vue'

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

    const handleClick = async () => {
        await submitForm();
        emit('logChanged');
    }
</script>

<style scoped>
    .write
    {
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
</style>