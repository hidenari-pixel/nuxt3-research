<template>
    <el-card>
        <template #header>
            <span style="font-weight: bold;">現在の状態</span>
        </template>
        <el-space direction="vertical" style="padding: 10px 0; justify-content: space-around;" :size="50">
            <Timer />
            <el-space direction="vertical" :size="20">
                <el-space :size="20" :spacer="spacer()">
                    <el-button @click="onAttend" :disabled="isAttend || isFinish" size="large" type="primary">出勤</el-button>
                    <el-button @click="onFinishAttend" :disabled="!isAttend || isBreaking" size="large" type="warning">退勤</el-button>
                </el-space>
                <el-space :size="20" :spacer="spacer()">
                    <el-button @click="onBreak" :disabled="!isAttend || isBreaking || isFinish" size="large" type="primary">休憩</el-button>
                    <el-button @click="onFinishBreak" :disabled="!isBreaking" size="large" type="warning">終了</el-button>
                </el-space>
            </el-space>
            <el-space :size="20">
                <el-tag v-if="isAttend" style="font-size: 24px; padding: 20px;" size="large" type="success" plain round>出勤中</el-tag>
                <el-tag v-if="isBreaking" style="font-size: 24px; padding: 20px;" size="large" type="warning" plain round>休憩中</el-tag>
                <el-tag v-if="isFinish" style="font-size: 24px; padding: 20px;" size="large" type="info" round>出勤済</el-tag>
                <el-tag v-if="isNoAttend" style="font-size: 24px; padding: 20px;" size="large" type="danger" plain round>未出勤</el-tag>
            </el-space>
        </el-space>
    </el-card>
</template>

<script setup>
    import { format } from 'date-fns';
    import { ElDivider } from 'element-plus';
    import Timer from './Timer.vue';
    import { fetchTodayWorks } from '~~/utils/works';

    const spacer = () => h(ElDivider, { direction: 'vertical' })

    const { workId, start_time, end_time, breakings } = await fetchTodayWorks();
    const isNoAttend = ref(Boolean(!start_time && !end_time))
    const isAttend = ref(Boolean(start_time && !end_time))
    const latestBreaking = breakings.at(-1)
    const work_id = ref(workId);
    const breaking_id = ref(latestBreaking?.breaking_id);
    const isBreaking = ref(Boolean(latestBreaking && latestBreaking.start_time && !latestBreaking.end_time))
    const isFinish = ref(Boolean(start_time && end_time))

    const { currentUser } = useAuth()
    const client = useSupabaseClient()

    const onAttend = async () => {
        const now = new Date()
        await client.from("works").insert({
            user_id: currentUser.value.id,
            work_date: format(now, "yyyy-MM-dd"),
            start_time: format(now, "hh:mm:00"),
            absence_type: "none",
        }).then(async () => {
            const { workId, start_time, end_time } = await fetchTodayWorks();
            isNoAttend.value = Boolean(!start_time && !end_time)
            isAttend.value = Boolean(start_time && !end_time)
            work_id.value = workId
        })
    }

    const onBreak = async () => {
        const now = new Date()
        await client.from("breakings").insert({
            work_id: work_id.value,
            user_id: currentUser.value.id,
            start_time: format(now, "hh:mm:00"),
        }).then(async () => {
            const { breakings } = await fetchTodayWorks();
            const latestBreaking = breakings.at(-1)
            isBreaking.value = Boolean(latestBreaking && latestBreaking.start_time && !latestBreaking.end_time)
            breaking_id.value = latestBreaking?.breaking_id;
        })
    }

    const onFinishBreak = async () => {
        const now = new Date()
        await client.from("breakings").update({
            end_time: format(now, "hh:mm:00"),
        }).match({
            breaking_id: breaking_id.value,
        }).then(async () => {
            const { breakings } = await fetchTodayWorks();
            const latestBreaking = breakings.at(-1)
            isBreaking.value = Boolean(latestBreaking && latestBreaking.start_time && !latestBreaking.end_time)
        })
    }

    const onFinishAttend = async () => {
        const now = new Date()
        await client.from("works").update({
            end_time: format(now, "hh:mm:00"),
        }).match({
            work_id: work_id.value,
        }).then(async () => {
            const { start_time, end_time } = await fetchTodayWorks();
            isNoAttend.value = Boolean(!start_time && !end_time)
            isAttend.value = Boolean(start_time && !end_time)
            isFinish.value = Boolean(start_time && end_time)
        })
    }
</script>