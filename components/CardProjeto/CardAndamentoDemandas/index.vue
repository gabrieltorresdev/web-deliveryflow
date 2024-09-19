<script lang="ts" setup>
import type { CardProjetoCardAndamentoDemandasProps } from ".";
const { titulo, quantidade } =
  defineProps<CardProjetoCardAndamentoDemandasProps>();
</script>

<template>
  <UButton
    color="white"
    class="shadow-none ring-0 ring-gray-200 p-0 cursor-default"
  >
    <div class="p-4 flex flex-col rounded-lg gap-1 w-36">
      <h4 class="text-base font-normal">{{ titulo }}</h4>
      <h5 class="text-3xl tracking-wide font-medium">{{ quantidade }}</h5>
    </div>
  </UButton>
</template>
