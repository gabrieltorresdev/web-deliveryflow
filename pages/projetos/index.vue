<script setup lang="ts">
import { useAppStore } from "~/store/store";
import type { IProjeto } from "~/types/projeto";

const appStore = useAppStore();
onMounted(() => {
  appStore.changeTituloPagina("Projetos");
  appStore.changeIconePagina("fluent:laptop-32-filled");
});

const { data: projetos, status } = await useLazyFetch<{ data: IProjeto[] }>(
  () => "http://localhost:8000/api/v1/projetos",
  {
    default: () => ({ data: [] }),
    server: false,
  }
);
</script>

<template>
  <div class="grid grid-cols-1 2xl:grid-cols-2 gap-4">
    <template v-for="projeto in projetos.data" v-if="status === 'success'">
      <CardProjeto :projeto="projeto" />
    </template>
    <template v-for="i in 10" v-else>
      <USkeleton class="h-52" />
    </template>
  </div>
</template>
