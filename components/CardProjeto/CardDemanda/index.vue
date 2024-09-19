<script lang="ts" setup>
import type { CardProjetoCardDemandaProps } from ".";

defineProps<CardProjetoCardDemandaProps>();

function getCorUrgencia(urgencia: string): string {
  switch (urgencia) {
    case "alta":
      return "ring-red-400";
    case "média":
      return "ring-yellow-400";
    default:
      return "ring-blue-400";
  }
}

function getIconUrgencia(urgencia: string): string {
  switch (urgencia) {
    case "alta":
      return "fluent:warning-32-filled";
    case "média":
      return "yellow";
    default:
      return "blue";
  }
}
</script>

<template>
  <UButton color="white" :class="`ring ${getCorUrgencia(urgencia)}`">
    <div class="h-12 flex items-center">
      <div class="flex gap-2 items-center">
        <UChip position="top-right" color="green">
          <UButton
            color="white"
            icon="fluent:alert-24-regular"
            :ui="{
              rounded: 'rounded-full',
            }"
          />
        </UChip>
        <h3 class="font-medium text-left leading-6 line-clamp-1">
          {{ titulo }}
        </h3>
      </div>
    </div>
  </UButton>
</template>
