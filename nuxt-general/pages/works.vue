<template>
    <el-main>
        <el-space :spacer="spacer()" style="padding-bottom: 20px">
            <el-space direction="vertical" alignment="start" :size="0">
                <span style="font-size: 18px;">{{ format(new Date(`${month}-01`), "yyyy年MM月") }}の勤怠状況</span>
                <span style="font-size: 12px; color: rgba(0,0,0,0.6)">総勤務時間 : 12時間00分</span>
            </el-space>
            <el-space :spacer="spacer()">
                <!-- ここ問題あり -->
                <!-- /worksページでリロードした後に /ページへ遷移するとエラー -->
                <el-date-picker />
                <el-button type="primary" plain>PDFで出力</el-button>
            </el-space>
        </el-space>
        <el-table :data="monthData" style="height: 80vh;" header-cell-class-name="table-header-cell">
            <el-table-column fixed label="日付" prop="date" width="100px" >
                <template #default="props">
                    <span v-if="props.row.date.match('土') !== null" style="color: #1E90FF;">{{ props.row.date }}</span>
                    <span v-if="props.row.date.match('日') !== null" style="color: #FF0000;">{{ props.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="勤務時間" prop="works" />
            <el-table-column label="休憩時間" prop="breakings">
                <template #default="props">
                    <el-space :size="0" v-for="breaking in props.row.breakings">
                        <span>{{ breaking.start_time }} - {{ breaking.end_time }}</span>
                    </el-space>
                </template>
            </el-table-column>
            <el-table-column label="休憩時間合計" prop="breakingSum" />
            <el-table-column label="勤務時間合計" prop="workSum" />
            <el-table-column label="コメント" prop="comment" />
            <el-table-column fixed="right" width="100px">
                <template #default="props">
                    <el-button @click="openM(props.row)" type="primary" plain size="small">編集</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-main>
    <el-dialog v-model="modalOpen" width="60%" :title="`${format(month, 'yyyy年MM月')}${modalValue ? modalValue.date : ''} の勤務時間`" :before-close="closeM">
        <el-space direction="vertical" alignment="start" style="width: 100%;">
            <el-space :size="10" :spacer="spacer()">
                <span>勤務時間</span>
                <el-date-picker v-model="workTime" type="datetimerange" />
                <el-button @click="modalValue && updateWorks(modalValue.work_id, currentUser?.id, `${format(new Date(), 'yyyy-MM')}-${modalValue.day - 1}`, format(workTime[0], 'hh:mm:00'), format(workTime[1], 'hh:mm:00'), onUpdate)" type="primary" plain>変更</el-button>
            </el-space>
            <el-space :size="10" :spacer="spacer()" alignment="start">
                <span style="white-space: nowrap">休憩時間</span>
                <el-space direction="vertical">
                    <el-space v-if="modalValue?.work_id !== 0">
                        <span style="white-space: nowrap;">New</span>
                        <el-date-picker v-model="breakingTime" type="datetimerange" />
                        <el-button @click="modalValue && insertBreaking(modalValue.work_id, currentUser?.id, format(breakingTime[0], 'hh:mm:00'), format(breakingTime[1], 'hh:mm:00'), onUpdate)" type="primary" plain>変更</el-button>
                    </el-space>
                    <el-space v-for="(_, i) in breakingTimes">
                        <span>{{ i + 1 }}</span>
                        <el-date-picker v-model="breakingTimes[i]" type="datetimerange" />
                        <el-button @click="modalValue && updateBreakings(modalValue.breakings[i].breaking_id, format(breakingTimes[i][0], 'hh:mm:00'), format(breakingTimes[i][1], 'hh:mm:00'), onUpdate)" type="primary" plain>変更</el-button>
                    </el-space>
                </el-space>
            </el-space>
            <el-space :size="10" :spacer="spacer()" alignment="start">
                <span>コメント</span>
                <el-input 
                    v-model="comment"
                    autosize
                    :rows="3"
                    type="textarea"
                    style="width: 100%;"
                    placeholder="Please input"
                />
                <el-button type="primary" plain @click="modalValue && updateComment(modalValue?.work_id, comment, onUpdate)">変更</el-button>
            </el-space>
        </el-space>
    </el-dialog>
</template>

<style>
    .table-header-cell {
        background: #636466 !important;
        color: #fff !important;
    }
</style>

<script setup lang="ts">
    import { ElDivider } from 'element-plus';
    import { format } from "date-fns";
    import { Works } from "../types/works"
    const spacer= () => h(ElDivider, { direction: 'vertical' });

    const month = ref(new Date());
    const modalValue = ref<Works | null>(null)
    const workTime = ref<[Date, Date]>([
        new Date(`${format(month.value, "yyyy-MM")}-${modalValue?.value?.day} 00:00`),
        new Date(`${format(month.value, "yyyy-MM")}-${modalValue?.value?.day} 00:00`),
    ])
    const breakingTime = ref<[Date, Date]>([
        new Date(`${format(month.value, "yyyy-MM")}-${modalValue?.value?.day} 00:00`),
        new Date(`${format(month.value, "yyyy-MM")}-${modalValue?.value?.day} 00:00`),
    ])
    const breakingTimes = ref<[Date, Date][]>([])
    const comment = ref("")
    const modalOpen = ref(false)
    const openM = (value: Works) => {
        modalValue.value = value
        const [start, end] = value.works.split(" - ")
        workTime.value = [
            new Date(`${format(month.value, "yyyy-MM")}-${value?.day} ${start}`),
            new Date(`${format(month.value, "yyyy-MM")}-${value?.day} ${end}`),
        ]
        breakingTimes.value = value.breakings.map((b) => ([
            new Date(`${format(month.value, "yyyy-MM")}-${modalValue?.value?.day} ${b.start_time}`),
            new Date(`${format(month.value, "yyyy-MM")}-${modalValue?.value?.day} ${b.end_time}`),
        ]))
        comment.value = value.comment
        modalOpen.value = true
    }
    const closeM = () => {
        modalValue.value = null
        modalOpen.value = false
    }

    const { currentUser } = useAuth()
    const { updateWorks, updateBreakings, insertBreaking, updateComment } = useWorkEdit()
    const monthData = ref(await createMonthData(format(month.value, 'yyyy-MM'), currentUser))

    const onUpdate = async () => {
        monthData.value = await createMonthData(format(month.value, 'yyyy-MM'), currentUser)
    }

    watch(() => month.value, async () => await onUpdate())

    definePageMeta({
        middleware: ["auth"]
    })
</script>