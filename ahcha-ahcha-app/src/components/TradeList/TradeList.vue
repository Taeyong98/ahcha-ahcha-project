<template>

    <div class=""
    style=" width: 100%;">
        <div>
            <button class="btn btn-main"
            @click="dateToggle()">
                {{range.start.getFullYear()+'.'+(parseInt(range.start.getMonth())+1)
                 +' ~ '+
                 range.end.getFullYear()+'.'+(parseInt(range.end.getMonth())+1)}}
            </button>
            <span>
                <button class="btn btn-main" 
                style="margin-left:10px"
                @click="toggleCategoryModal()">
                    카테고리 선택
                </button>
                <div class="selectCategoryBox card"
                v-if="isShowModal">
                    <div class="group1">
                        <button class="btn" @click="changeCategorySortButton('outcome')"
                        :style="[categorySortSelected.sort=='outcome' ? selectedButton : '']"
                        >지출</button>
                        <button class="btn" @click="changeCategorySortButton('income')"
                        :style="[categorySortSelected.sort=='income' ? selectedButton : '']"
                        >수입</button>
                    </div>
                        <div v-for="ic in states.outcomeCategory">
                            <div class="form-check" style="margin-top: 10px;">
                            <input type="checkbox" class="form-check-input" >
                            <label class="form-check-label" for="check1">{{ ic }}</label>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn mt-3 btn-main">적용하기</button>
                    </div>
              
               
            </span>
          
        </div>
        <VDatePicker
            style="position:absolute;"
            v-model.range="range"
            @drag="dragValue = $event"
            :select-attribute="attr"
            :drag-attribute="attr"
            v-if="isCalendarShow"
        >
            <template #day-popover="{ format }"
            >
            <div>
                {{ format(range.start, 'MMM D') }}
                -
                {{ format(range.end, 'MMM D') }}
            
                <button>적용</button>    
            </div>
            
            </template>
        </VDatePicker>

        <div class="sort_button_group">
            <button class="btn" :style="[sortButtonGroup.sort=='all' ? selectedButton : '']"
             style="border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;"
            @click="changeSortButton('all')">전체</button>
            <button class="btn" style="border-radius: 0px;"
            @click="changeSortButton('outcome')"
            :style="[sortButtonGroup.sort=='outcome' ? selectedButton : '']"
            >지출</button>
            <button class="btn" style="border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;"
            :style="[sortButtonGroup.sort=='income' ? selectedButton : '']"
            @click="changeSortButton('income')">수입</button>
        </div>
        <div style="margin-top: 2px; margin-bottom: 20px;" class="sort_button_group">
            <label>{{ account.all }}원</label>
            <label style="color: #FF3838;">{{ account.outcome }}원</label>
            <label style="color: #0066FF;">{{ account.income }}원</label>
        </div>



        <div>
            <table class="table" style="text-align: center">
                <thead>
                    <tr>
                    <th>날짜</th>
                    <th>카테고리</th>
                    <th>금액</th>
                    <th>내용</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="t in states.tradeList">
                    <td>{{ getShowDate(t.date) }}</td>
                    <td>{{ t.category }}</td>
                    <td :style="[t.type=='income' ? incomeText : outcomeText]">{{ t.price.toLocaleString() }}원</td>
                    <td>{{ t.desc }}</td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue';
import axios from 'axios';
export default {
    //props:["states"],
    setup(){
        const account = reactive({
            "all":0,
            "income":0,
            "outcome":0
        });


        const BASEURL = "http://localhost:3001";
        const states = reactive({
            tradeList:[],
            incomeCategory:[],
            outcomeCategory:[]
        })

        let income = 0;
        let outcome = 0;
        const fetchTradeList = async () => {
            try{
                const response = await axios.get(BASEURL+'/trade_list');
                if(response.status == 200){

                    states.tradeList= response.data;
                    console.log(states.tradeList);
                    states.tradeList.forEach((item)=>{
                        if(item.type=='income'){
                            income += parseInt(item.price);
                        }else{
                            outcome += parseInt(item.price);
                        }
                    })

                    account.all = (income-outcome).toLocaleString();
                    account.income = income.toLocaleString();
                    account.outcome = outcome.toLocaleString();

                    console.log(income)
                    console.log(outcome);


                }else{
                    alert("거래 내역을 가져오는데 실패하였습니다. ");
                }
            }catch(error){
                alert(error);
            }
        }

        const fetchCategory = async () => {
            try{
                const response = await axios.get(BASEURL+'/user_category?id=ted');
                if(response.status == 200){
                    states.incomeCategory = response.data[0].income;
                    states.outcomeCategory = response.data[0].outcome;

                }else{
                    alert("카테고리 내역을 가져오는데 실패하였습니다. ");
                }
            }catch(error){
                alert(error);
            }
        }

        onMounted(()=>{
            fetchTradeList();
            fetchCategory();
        });

        // 일주일 간의 거래 내역을 보여준다. 
        const showPeriod = 7;
        const today = new Date();
        let startDate = new Date(new Date().setDate(today.getDate()-showPeriod));

        // 선택되는 날짜 데이터
        const range = reactive({
            start: startDate,
            end: today,
        });

        
        const isCalendarShow = ref(false);

        // 캘린더에서 선택된 기간의 색상을 위한 값
        const attr= {
            highlight: {
                start: {
                    style: {
                        backgroundColor: '#F1B73F',
                    },
                    contentStyle: {
                        color: '#ffffff' // color of the text
                    }
                },
                base: {
                    style: {
                        backgroundColor: '#FBE4A7',
                    }
                },
                end: {
                    style: {
                        backgroundColor: '#F1B73F', 
                    },
                    contentStyle: {
                        color: '#ffffff' // color of the text
                    }
                }
            }
        };

        function dateToggle(){
            if(isCalendarShow.value){
                isCalendarShow.value = false;
            }else{
                isCalendarShow.value = true;
            }
        }


        // sort는 all 또는 income 또는 outcome
        const sortButtonGroup = reactive({"sort":"all"})
        const selectedButton = {
            backgroundColor: '#F1B73F'
        }
        function changeSortButton(value){
            sortButtonGroup.sort = value;
        }

        const isShowModal = ref(false);
        // 카테고리 모달 띄울 토글
        function toggleCategoryModal(){
            isShowModal.value = !(isShowModal.value);
        }
        const categorySortSelected = reactive({
            "sort":"outcome"
        })
        function changeCategorySortButton(value){
            categorySortSelected.sort = value;
        }


        function getShowDate(value){
            const date = new Date(value);
            const d = date.getFullYear()+"."+(date.getMonth()+1)
            +'.'+date.getDate();
            return d;
        }

        
        const incomeText = {color: "#0066FF"};
        const outcomeText = {color:"#FF3838"}



        return {states, range, attr, isCalendarShow,dateToggle, sortButtonGroup,
            selectedButton, categorySortSelected,changeCategorySortButton,
            changeSortButton, toggleCategoryModal, isShowModal, account
           , getShowDate, incomeText, outcomeText,
        };
    }    
}
</script>


<style scoped>

.sort_button_group button{
    background-color: #D7D7D7;
    width:33.3%;
    border-radius: 5px;
}

.selected_button{
    background-color: #F1B73F;
}
.sort_button_group{
    margin-top: 10px;
}
.sort_button_group label{
    width:33.3%;
    text-align: center;

}


.group1 button{
    width: 50%;
    border-color: white;
}
.group1 button:active{
    border-color: white;
}
.dropdown-menu{
    width:300px;
}

.selectCategoryBox{
    position: absolute;
    background-color: white;
    width: 50%;
    transform: translate(50%,50%);
    
    padding: 10px;
}
</style>