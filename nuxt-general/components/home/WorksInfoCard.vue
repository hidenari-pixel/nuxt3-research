<template>
    <el-card>
        <template #header>
            <span style="font-weight: bold;">本日の出勤</span>
        </template>
        <el-space direction="vertical" style="padding: 10px 0;" :size="20" alignment="flex-start">
            <el-space :spacer="spacer()">
                <span style="width: 6rem; font-weight: bold;">出勤時間</span>
                <span>{{ start_time }} - {{ end_time }}</span>
            </el-space>
            <div v-for="(breaking, i) in breakings">
                <el-space :spacer="spacer()">
                    <span style="width: 6rem; font-weight: bold;">休憩{{ i + 1 }}</span>
                    <span>{{ parseTime(breaking.start_time) }} - {{ parseTime(breaking.end_time) }}</span>
                </el-space>
            </div>
            <el-space :spacer="spacer()">
                <span style="width: 6rem; font-weight: bold;">休憩時間合計</span>
                <span>{{ breakSum }}</span>
            </el-space>
            <el-space :spacer="spacer()">
                <span style="width: 6rem; font-weight: bold;">勤務時間合計</span>
                <span>{{ workSum }}</span>
            </el-space>
            <el-space :spacer="spacer()" alignment="start">
                <span style="width: 6rem; font-weight: bold;">コメント</span>
                <span style="width: 18rem">{{ comment }}</span>
            </el-space>
        </el-space>
    </el-card>
</template>

<script setup lang="ts">
import { parseTime } from '~~/utils/time';
import { ElDivider } from 'element-plus';

    const spacer= () => h(ElDivider, { direction: 'vertical' })
    const todayWorks = ref(await fetchTodayWorks())
    const { start_time, end_time, breakings, workSum, breakSum, comment } = todayWorks.value

    watchEffect(async () => {
        todayWorks.value = await fetchTodayWorks();
    })
</script>