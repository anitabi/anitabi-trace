<template>
    <div>
        <p>请求发生错误了 qwq</p>
        <p>错误事件 ID: {{ eventId || '未知' }}</p>
        <p>将错误反馈给我们以便更好改进巡礼对决哦~</p>
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    eventId: string | null | undefined;
}>();
</script>
