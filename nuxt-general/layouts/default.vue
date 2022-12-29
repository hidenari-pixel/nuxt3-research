<template>
    <el-page-header :icon="''">
        <template #title>
            <el-space :size="3" alignment="start" :spacer="spacer()">
                <span style="font-size: 20px; font-weight: bold;">勤怠管理システム</span>
                <span style="font-weight: bold;">{{ username }}さん</span>
            </el-space>
        </template>
        <template #content>
            <div style="display: flex;">
                <el-button link type="primary" style="margin: 10px;" @click="navigateTo('/')">ホーム</el-button>
                <el-button link type="primary" style="margin: 10px;" @click="navigateTo('/works')">勤務状況</el-button>
                <el-button link type="danger" style="margin: 10px;" :loading="loading" @click="logout">ログアウト</el-button>
            </div>
        </template>
        <div></div>
    </el-page-header>

    <slot />
</template>

<script setup lang="ts">
    import { ElDivider } from 'element-plus';
    import { User } from '~~/types/user';

    const spacer= () => h(ElDivider, { direction: 'vertical' })

    const supabase = useSupabaseClient()
    const username = ref('')
    
    const { currentUser, logout, loading } = useAuth()
    const { data } = await supabase
        .from('users')
        .select<"*", User>(`*`)
        .match({ id: currentUser.value?.id })
        .single()
    if (data) {
        username.value = data.user_name
    }

</script>