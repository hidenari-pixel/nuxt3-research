<template>
    <span style="font-size: 18px; font-weight: bolder;">{{ timer }}</span>
</template>

<script setup>
    import { format } from 'date-fns';

    const timer = ref(format(new Date(), "yyyy-MM-dd HH:mm:ss"))

    onMounted(() => {
        setInterval(() => {
            timer.value = format(new Date(), "yyyy-MM-dd HH:mm:ss")
        }, 1000)
    })
</script>