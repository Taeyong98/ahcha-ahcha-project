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
            <button class="btn btn-main"
            style="margin-left:10px">
                카테고리 선택 ▼
            </button>
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
            <button class="btn" :class="[sortButtonGroup.sort=='all' ? selected_button : '']"
             style="border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;"
            @click="">전체</button>
            <button class="btn" style="border-radius: 0px;"
            @click="">지출</button>
            <button class="btn" style="border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;"
            @click="">수입</button>
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
import { ref, computed, reactive, provide } from 'vue';

export default {
    props:{
        tradeList:{}
    },
    setup(props){
      
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
                        backgroundColor: '#F1B73F', // blue
                    },
                    contentStyle: {
                        color: '#ffffff' // color of the text
                    }
                },
                base: {
                    style: {
                        backgroundColor: '#FBE4A7', // light blue
                    }
                },
                end: {
                    style: {
                        backgroundColor: '#F1B73F', // blue
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
        const selected_button = {
            style: {
                backgroundColor: '#F1B73F', // blue
            }
        }


        return {range, attr, isCalendarShow,dateToggle, sortButtonGroup,
            selected_button
        };
    }    
}
</script>


<style scoped>
.datepicker{    
position:absolute;
width: 100%;
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
    text-align: center;
}

</style>