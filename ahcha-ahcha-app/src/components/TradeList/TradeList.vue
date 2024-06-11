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
                style="margin-left:10px">
                    카테고리 선택
                </button>
                <div class="selectCategoryBox card">
                    <div class="group1">
                        <button class="btn">지출</button>
                        <button class="btn">수입</button>
                    </div>
                    <div class="form-check" style="margin-top: 10px;">
                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something" checked>
                        <label class="form-check-label" for="check1">Option 1</label>
                        </div>
                        <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="check2" name="option2" value="something">
                        <label class="form-check-label" for="check2">Option 2</label>
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

        <div>
            <table>
                <tr v-for="t in tradeList">
                    <td>{{ t.desc }}</td>
                </tr>
            </table>
        </div>

       

    </div>
</template>
<script>
import { ref, computed, reactive, onMounted } from 'vue';

export default {
    props:["tradeList","category"],
    setup(props){
        console.log(props.category);
      
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


        const outcomeCategory = ref({});
        
        onMounted(()=>{

        
            
          
        })
        




        return {range, attr, isCalendarShow,dateToggle, sortButtonGroup,
            selectedButton, changeSortButton
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