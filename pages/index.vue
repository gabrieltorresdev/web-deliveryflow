<script setup lang="ts">
import { useAppStore } from '~/store/store';

const appStore = useAppStore();
onMounted(() => {
    appStore.changeTituloPagina("Dashboard")
    appStore.changeIconePagina("fluent:glance-horizontal-32-filled")
})

</script>

<template>
    <h1>Gestao</h1>
</template>
