<template>
    <el-main style="width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center; background-color: rgba(240,248,255, 0.5)">
        <el-card style="width: 50%; height: 50%; background-color: #fff;">
            <template #header>
                <h2 style="text-align: center;">勤怠管理システム</h2>
            </template>
            <el-form label-width="120px">
                <el-form-item label="メールアドレス" :disabled="!loading">
                    <el-input v-model="form.email" type="email" :disabled="loading" />
                </el-form-item>
                <el-form-item label="パスワード">
                    <el-input v-model="form.password" type="password" show-password :disabled="loading" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit" type="primary" :disabled="!trim(form.email) || !trim(form.password)" :loading="loading">ログイン</el-button>
                </el-form-item>
            </el-form>  
        </el-card>
    </el-main>
</template>

<script setup>
    import { trim } from 'lodash';

    const { login, loading } = useAuth();
    
    const form = reactive({
        email: "",
        password: "",        
    })
    
    const onSubmit = async () => {
        await login(form)
    }
    
    definePageMeta({
        layout: false,
        middleware: ["auth"]
    })
</script>