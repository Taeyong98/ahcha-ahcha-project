<template>
    
    <div 
    style=" width: 70%; padding-top: 50px; margin: 0 auto;">
        <div>
            <button class="btn btn-main"
            @click="dateToggle()">
                {{ dateFormatChange(range.start)
                 +' ~ '+
                 dateFormatChange(range.end)}}
            </button>
            <span style="position: relative;">
                <button class="btn btn-main" 
                style="margin-left:15px"
                @click="toggleCategoryModal()">
                    카테고리 선택
                </button>
                <div class="selectCategoryBox card"
                v-if="isShowModal">
                    <div class="group1">
                        <button class="btn" @click="changeCategorySortButton('outcome')"
                        :style="[typeSelected.sort=='outcome' ? selectedButton2 : '']"
                        >지출</button>
                        <button class="btn" @click="changeCategorySortButton('income')"
                        :style="[typeSelected.sort=='income' ? selectedButton2 : '']"
                        >수입</button>
                    </div>
                        <div v-for="ic in states.outcomeCategory"
                        v-if="typeSelected.sort=='outcome'">
                            <div class="form-check" style="margin-top: 15px;">
                            <input type="checkbox" class="form-check-input" :id="ic"
                            v-model="checkedOutcomeCategory.list" :value="ic">
                            <label class="form-check-label" :for="ic">{{ ic }}</label>
                            </div>
                        </div>
                        <div v-for="ic in states.incomeCategory"
                        v-if="typeSelected.sort=='income'">
                            <div class="form-check" style="margin-top: 15px;">
                            <input type="checkbox" class="form-check-input" :id="ic"
                            v-model="checkedIncomeCategory.list" :value="ic">
                            <label class="form-check-label" :for="ic">{{ ic }}</label>
                            </div>
                        </div>
                        
                        <button type="submit" 
                        class="btn mt-3 btn-main" @click="categorySubmit()">적용하기</button>
                    </div>
               
            </span>

          
        </div>
        <div v-if="isCalendarShow"
        class="calendar-container">
            <VDatePicker
            style="border-color: white"
            v-model.range="range"
            @drag="range = $event"
            :select-attribute="attr"
            :drag-attribute="attr"
            
        >
            <template #day-popover="{ format }"
            >
            <div>
                {{ format(range.start, 'MMM D') }}
                -
                {{ format(range.end, 'MMM D') }}
            
                   
            </div>
            
            </template>
        </VDatePicker>
        <div>
            <button class="btn btn-main"
            style="float:right; margin: 12px 10px;"
            @click="changeDate(range)">
            적용</button>
        </div>
        </div>
        

        <div class="sort_button_group">
            <button class="btn" :style="[typeButtonGroup.sort=='all' ? selectedButton : '']"
             style="border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;"
            @click="changeTypeButton('all')">전체</button>
            <button class="btn" style="border-radius: 0px;"
            @click="changeTypeButton('outcome')"
            :style="[typeButtonGroup.sort=='outcome' ? selectedButton : '']"
            >지출</button>
            <button class="btn" style="border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;"
            :style="[typeButtonGroup.sort=='income' ? selectedButton : '']"
            @click="changeTypeButton('income')">수입</button>
        </div>
        <div style="margin-top: 2px; margin-bottom: 20px;" class="sort_button_group">
            <label>{{ account.all.toLocaleString() }}원</label>
            <label style="color: #FF3838;">{{ account.outcome.toLocaleString() }}원</label>
            <label style="color: #0066FF;">{{ account.income.toLocaleString() }}원</label>
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
                <tr v-for="t in showTradeList.value">
                    <td>{{ getShowDate(t.date) }}</td>
                    <td>{{ t.category }}</td>
                    <td :style="[t.type=='income' ? incomeText : outcomeText]">{{ parseInt(t.price).toLocaleString() }}원</td>
                    <td>{{ t.desc }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <WriteButton @logChanged="fetchTradeList"></WriteButton>
        
    </div>
</template>


<script>
import { ref, computed, reactive, onMounted, watch } from 'vue';
import WriteButton from '@/components/write/WriteButton.vue';
import axios from 'axios';
export default {
    components:{
        WriteButton
    },
    //props:["states"],
    setup(){
         // 처음엔 일주일 간의 거래 내역을 보여준다. 
        const showPeriod = 7;
        let today = new Date();
        let startDate = new Date(new Date().setDate(today.getDate()-showPeriod));

        function dateFormatChange(d){
            return d.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            }) // 객체 {year, month, day}를 인수로 넣은 이유는 월, 일을 두자리로 만들기 위함 
            .replace(/\./g, '')
            .replace(/\s/g, '-');
        }
        // today = dateFormatChange(new Date());
        // startDate = dateFormatChange(startDate);

        // 선택되는 날짜 데이터
        const range = reactive({
            start: startDate,
            end: today,
        });


        // 체크박스에서 선택된 지출 카테고리 목록
        const checkedOutcomeCategory = reactive({list:[]});
        const checkedIncomeCategory = reactive({list:[]});

        // sort는 [all 또는 income 또는 outcome]
        const sortButtonGroup = reactive({"sort":"all"})
        function changeSortButton(value){
            sortButtonGroup.sort = value;
        }

        const isShowModal = ref(false);
        // 카테고리 모달 띄울 토글
        function toggleCategoryModal(){
            isShowModal.value = !(isShowModal.value);
        }
        const typeSelected = reactive({
            "sort":"outcome"
        })
        function changeTypeButton(value){
            // 카테고리 필터링 모달에서 '지출' 또는 '수입' 버튼 누르면 호출됨
            // categoryType은 'income'또는'outcome'
            typeSelected.sort = value;
            console.log(typeSelected.sort);
        }

        // 테이블에 날짜 항목 형식 변환
        function getShowDate(value){
            const date = new Date(value);
            const d = date.getFullYear()+"."+(date.getMonth()+1)
            +'.'+date.getDate();
            return d;
        }



        // 전체, 수입, 지출에 맞게 얼마있는지 적용. 
        // axios로 가져올 때 반영됨
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

        // 새 데이터 불러올 때, '전체.지출.수입' 버튼 클릭됐을 때
        // 수정되어야 하는 데이터.
        // 테이블 내역을 보여주는 데이터.
        const showTradeList = reactive({value:{}});

        let income = 0;
        let outcome = 0;
        const fetchTradeList = async () => {
            try{
                const response = await axios.get(BASEURL+'/trade_list');
                if(response.status == 200){

                    states.tradeList = response.data;
                    filterAndSortTradeList();

                    // 전체, 수입, 지출 요금 저장해두기.
                    states.tradeList.forEach((item)=>{
                        if(item.type=='income'){
                            income += parseInt(item.price);
                        }else{
                            outcome += parseInt(item.price);
                        }
                    })

                    account.all = (income-outcome);
                    account.income = income;
                    account.outcome = outcome;


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

                    checkedOutcomeCategory.list = states.outcomeCategory;
                    checkedIncomeCategory.list = states.incomeCategory;

                    fetchTradeList();
                    
                    
                    
                }else{
                    alert("카테고리 내역을 가져오는데 실패하였습니다. ");
                }
            }catch(error){
                alert(error);
            }
        }


        // 날짜 순으로 tradeList 정렬함
        function sortTradeListByDate(list){
            list.sort((a, b)=>{
                if(a.date > b.date){
                    return -1;
                }else if(a.date < b.date){
                    return 1;
                }else{
                    return 1;
                }
            });
        }


         // 날짜에 맞게 보여지는 항목을 필터링한다. 
         function filterTradeListByDate(r, list){

            const start = dateFormatChange(r.start);
            const end = dateFormatChange(r.end);
            range.start = r.start;
            range.end = r.end;
            
            showTradeList.value = list.filter((item)=>{
                return item.date >= start && item.date <= end;
            })

        }
        // type에 따라서 show되는 tradeList가 다르게 됨. 
        const filterTradeListByType=(list)=>{
            if(sortButtonGroup.sort=='all'){
                showTradeList.value = states.tradeList;
                return;
            }
            showTradeList.value = list.filter((item)=>{
                return item.type==sortButtonGroup.sort   
            });
        }

        // 카테고리로 필터링함.
        function filterTradeListByCategory(list){
            showTradeList.value = list.filter((item)=>{
                return (item.type=='outcome' && checkedOutcomeCategory.list.includes(item.category))
                || (item.type=='income' && checkedIncomeCategory.list.includes(item.category));
            })
        }

        function filterAndSortTradeList(){
            filterTradeListByType(states.tradeList);
            filterTradeListByDate(range, showTradeList.value);
            sortTradeListByDate(showTradeList.value);
            filterTradeListByCategory(showTradeList.value);
        }

       
        // 달력 보여지는지 결정하는 변수
        const isCalendarShow = ref(false);
        function dateToggle(){
            if(isCalendarShow.value){
                isCalendarShow.value = false;
            }else{
                isCalendarShow.value = true;
            }
        }

        function changeDate(r){
            dateToggle();
            // 날짜에 맞게 거래 내역을 필터링한다.
            filterTradeListByType(states.tradeList);
            filterTradeListByDate(r, showTradeList.value);
            sortTradeListByDate(showTradeList.value);
            filterTradeListByCategory(showTradeList.value);
        }


        // 수입 텍스트 색, 지출 텍스트 색
        const incomeText = {color: "#0066FF"};
        const outcomeText = {color:"#FF3838"}
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
        // 테이블에서 선택된 종류(전체, 지출, 수입 중) 버튼 색
        const selectedButton = {
            backgroundColor: '#F1B73F'
        }
        const selectedButton2 = {
            backgroundColor:'#FBE4A7'
        }


         
      
        // 카테고리 적용 버튼 클릭됨.
        function categorySubmit(){
            toggleCategoryModal();
            filterAndSortTradeList();   
        }

        


        onMounted(()=>{
            fetchCategory();
        
        });
        
        watch([sortButtonGroup], ([newType])=>{
            // type이 바뀌면 보여지는 거래 내역 항목도 바뀐다. 
            filterAndSortTradeList();
        });


        return {states, range, attr, isCalendarShow,dateToggle, typeButtonGroup: sortButtonGroup,
            selectedButton, typeSelected: typeSelected,changeCategorySortButton: changeTypeButton,
            changeTypeButton: changeSortButton, toggleCategoryModal, isShowModal, account
           , getShowDate, incomeText, outcomeText,fetchTradeList, showTradeList
           ,changeDate, dateFormatChange, selectedButton2, checkedOutcomeCategory,checkedIncomeCategory,
           categorySubmit
        };
    }    
}

</script>


<style>
    .main-color{
        background-color:#F1B73F
    }
    .btn-main{
        background-color:#F1B73F;

    }
    .btn-main:hover{
        background-color:#F1B73F;
    }
    

    
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
    width: 170%;
    padding: 17px;
    left:0;
    margin-left:15px;
}
.selectCategoryBox input{
    padding-left: 10px;
}


.calendar-container{
    position:absolute; background-color: white;
    border: solid 1px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    border-color:#D7D7D7;
}
</style>