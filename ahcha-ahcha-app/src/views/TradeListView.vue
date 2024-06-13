<template>
    
    <div 
    style=" width: 70%; padding-top: 50px; margin: 0 auto;">
        <div style="position: relative;">
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

            <span v-if="checkedTradeList.list.length>0">
                <button class="btn btn-delete"
                @click="deleteTradeList()">
                    선택항목 삭제
                </button>
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
            <table class="table" style="text-align: center; " >
                <thead>
                    <tr style="border-color: #D7D7D7">
                        <th></th>
                    <th>날짜</th>
                    <th>카테고리</th>
                    <th>금액</th>
                    <th>내용</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody v-for="(t, index) in showTradeList.value">
    
                    <!-- 날짜가 바뀔 때마다 구분선을 추가 -->
                    <template v-if="index!=0 && (t.date) !== showTradeList.value[index - 1].date">
                    <tr style="border-top: 1px solid #D7D7D7; ">
                        <td colspan="6" style="padding:0px;"
                       ></td>
                    </tr>
                    </template>
                    <tr style="border-color: white;">
                        <td><input type="checkbox" class="form-check-input" :id="'checkbox'+t.id"
                            v-model="checkedTradeList.list" :value="t.id"></td>
                        <td>{{ getShowDate(t.date) }}</td>
                        <td>{{ t.category }}</td>
                        <td :style="[t.type=='income' ? incomeText : outcomeText]">{{ parseInt(t.price).toLocaleString() }}원</td>
                        <td>{{ t.desc }}</td>
                        <td >
                            <button type="button" class="btn icon-btn" data-bs-toggle="modal" 
                            :data-bs-target="'#'+t.id" >

                                <i class="material-icons" style="font-size:24px;">edit</i>
                                
                            </button>

                            <div class="modal fade" :id="t.id" tabindex="-1" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered custom-modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="aa">수정하기</h5>
                                            <button type="button" :id="'btn'+t.id" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <EditTradeComponent @submitForm="handleSubmitForm"
                                            v-bind:state="t" 
                                            v-bind:incomeCategory="states.incomeCategory"
                                            v-bind:outcomeCategory="states.outcomeCategory"
                                            :id="t.id"
                                            :key="componentKey.value"
                                            ></EditTradeComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </td>
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
import EditTradeComponent from '@/components/TradeList/EditTradeComponent.vue';
export default {
    components:{
        WriteButton,
        EditTradeComponent
    },
    //props:["states"],
    setup(){
        const componentKey = reactive({value:0});

        function forceRerenderModal(){
            console.log(componentKey.value);
            componentKey.value += 1;
        }
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
        function dateFormatChangeByDot(d){ 
            const dateString = d.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday:'long',
            });
            
            const parts = dateString.split(' ');
            const datePart = parts.slice(0, 3).join('');
            const weekdayPart = parts[3].slice(0,1);

            // 최종 형식으로 변환
            return `${datePart} (${weekdayPart})`;
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

        // 체크박스로 선택된 거래 항목
        const checkedTradeList = reactive({list:[]});

        // sort는 [all 또는 income 또는 outcome]
        const sortButtonGroup = reactive({"sort":"all"})
        function changeSortButton(value){
            sortButtonGroup.sort = value;
            forceRerenderModal();
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
       
        }

        // 테이블에 날짜 항목 형식 변환
        function getShowDate(value){
            const date = new Date(value);
            return dateFormatChangeByDot(date);
          
        }



        // 전체, 수입, 지출에 맞게 얼마있는지 적용. 
        // axios로 가져올 때 반영됨
        const account = reactive({
            "all":0,
            "income":0,
            "outcome":0
        });


        const BASEURL = "http://localhost:3001";
        const userid = "ted";
        const states = reactive({
            tradeList:[],
            incomeCategory:[],
            outcomeCategory:[]
        })

        // 새 데이터 불러올 때, '전체.지출.수입' 버튼 클릭됐을 때
        // 수정되어야 하는 데이터.
        // 테이블 내역을 보여주는 데이터.
        const showTradeList = reactive({value:{}});

        const fetchTradeList = async () => {
            try{
                const response = await axios.get(BASEURL+'/trade_list?userid='+userid);
                if(response.status == 200){

                    states.tradeList = response.data;
                    filterAndSortTradeList();


                }else{
                    alert("거래 내역을 가져오는데 실패하였습니다. ");
                }
            }catch(error){
                alert(error);
            }
        }

        const fetchCategory = async () => {
            try{
                const response = await axios.get(BASEURL+'/user_category?id='+userid);
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


        // 내역 편집해서 업데이트 됨. 
        const updateTradeList = async(value) =>{
            try{
                const response = await axios.put(BASEURL+'/trade_list/'+value.id,value);
                if(response.status == 200){
                    let index = states.tradeList.findIndex((item)=> item.id==value.id);
                    states.tradeList[index] = value;

                    fetchTradeList();
                    
                    
                    
                }else{
                    alert("카테고리 내역을 가져오는데 실패하였습니다. ");
                }
            }catch(error){
                alert(error);
            }
        }

        const deleteTrade = async(id) => {
            console.log(id);
            try{
                const response = await axios.delete(BASEURL+"/trade_list/"+id);
                if(response.status == 200){
                    let index = states.tradeList.findIndex((item)=> item.id==id);
       
                    states.tradeList.splice(index,1);

                    filterAndSortTradeList();
                }else{
                    console.log("삭제 실패");
                }
            }catch(error){
                alert("삭제 실패: "+error);
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

            let income = 0;
            let outcome = 0;
            // 전체, 수입, 지출 요금 저장해두기.
            states.tradeList.forEach((item)=>{
                if(item.type=='income'){
                    income += parseInt(item.price);
                }else{
                    outcome += parseInt(item.price);
                }
            });

            account.all = (income-outcome);
            account.income = income;
            account.outcome = outcome;

            forceRerenderModal();
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
            forceRerenderModal();
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

        // 선택 항목 삭제하는 함수
        function deleteTradeList(){
            console.log(checkedTradeList.list);
            checkedTradeList.list.forEach((item)=>{
                deleteTrade(item);
            })

            checkedTradeList.list = [];

        }
        


        onMounted(()=>{
            fetchCategory();
        
        });
        
        watch([sortButtonGroup], ([newType])=>{
            // type이 바뀌면 보여지는 거래 내역 항목도 바뀐다. 
            filterAndSortTradeList();
        });


        // 수정
        const handleSubmitForm = (value) => {
            const closeButton = document.querySelector('#btn'+value.id);
            if (closeButton) {
                closeButton.click();
            }
            updateTradeList(value);
            
        };


        return {states, range, attr, isCalendarShow,dateToggle, typeButtonGroup: sortButtonGroup,
            selectedButton, typeSelected: typeSelected,changeCategorySortButton: changeTypeButton,
            changeTypeButton: changeSortButton, toggleCategoryModal, isShowModal, account
           , getShowDate, incomeText, outcomeText,fetchTradeList, showTradeList
           ,changeDate, dateFormatChange, selectedButton2, checkedOutcomeCategory,checkedIncomeCategory,
           categorySubmit, dateFormatChangeByDot, checkedTradeList, deleteTradeList,
           handleSubmitForm, componentKey
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

.table th, .table td {
  padding-top: 15px;
  text-align: center;
  align-items: center;
  
}

.btn-delete{
    background-color:#FF3838;
    color:white;
    position:absolute;
    right: 0;
}

.btn-delete:hover{
    background-color: #FFE1E1;
    color:#FF3838
}

.icon-btn{
    border-color: white;
    outline: none;
}

.custom-modal-dialog {
    max-width: 80vw; /* 최대 너비를 뷰포트 너비의 80%로 설정 */
    width: 80vw;
}

.custom-modal-dialog .modal-content {
    height: 80vh; /* 높이를 뷰포트 높이의 80%로 설정 */
}

.modal-body {
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤 가능 */
}
</style>