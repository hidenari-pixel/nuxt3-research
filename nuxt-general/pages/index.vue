<template>
    <el-row justify="center" style="padding: 50px 0;">
        <el-space style="align-items: stretch;">
            <ButtonsCard />
            <WorksInfoCard />
        </el-space>
    </el-row>
</template>

<script setup lang="ts">
    import ButtonsCard from '../components/home/ButtonsCard.vue';
    import WorksInfoCard from '~~/components/home/WorksInfoCard.vue';

    definePageMeta({
        middleware: ["auth"]
    })
</script>