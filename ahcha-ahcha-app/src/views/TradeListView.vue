<template>
    <div>
        <div>
            <button>
                {{showDate.start +' ~ '+showDate.end}}
            </button>
        </div>
        <VDatePicker
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
            </div>
            </template>
        </VDatePicker>

    </div>
</template>


<script>
import { ref, computed, reactive } from 'vue';
export default{
    setup(){
        // 일주일 간의 거래 내역을 보여준다. 
        const showPeriod = 7;
        const today = new Date();
        let startDate = new Date(new Date().setDate(today.getDate()-showPeriod));

        // 선택되는 날짜 데이터
        const range = reactive({
            start: startDate,
            end: today,
        });

        // 달력 보여주는 달력에 보일 텍스트
        const showDate = {
            start:range.start.getFullYear()+'.'+(parseInt(range.start.getMonth())+1),
            end:range.end.getFullYear()+'.'+(parseInt(range.end.getMonth())+1)
        }
        
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


        return {range, attr, showDate, isCalendarShow};
    }
}

</script>


<style scoped>

</style>