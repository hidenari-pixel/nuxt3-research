<template>
    <el-page-header :icon="''">
        <template #title>
            <el-space :size="20" alignment="start" :spacer="spacer()">
                <span style="font-size: 20px; font-weight: bold;">勤怠管理システム</span>
                <span style="font-weight: bold;">〇〇さん</span>
            </el-space>
        </template>
        <template #content>
            <div style="display: flex;">
                <el-button link type="primary" style="margin: 10px;" @click="navigateTo('/')">ホーム</el-button>
                <el-button link type="primary" style="margin: 10px;" @click="navigateTo('/works')">勤務状況</el-button>
                <el-button link type="danger" style="margin: 10px;" @click="navigateTo('/login')">ログアウト</el-button>
            </div>
        </template>
        <div></div>
    </el-page-header>

    <slot />
</template>

<script setup>
import { ElDivider } from 'element-plus';
const spacer= () => h(ElDivider, { direction: 'vertical' })
</script>
