<script lang="ts" setup>
import type { CardProjetoButtonLinkProjetoProps } from ".";
defineProps<CardProjetoButtonLinkProjetoProps>();
</script>

<template>
  <UButton
    :to="to"
    variant="outline"
    color="primary"
    icon="fluent:slide-text-cursor-24-regular"
    :ui="{
      rounded: 'rounded-full',
    }"
  />
</template>
