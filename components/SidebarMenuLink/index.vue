<script lang="ts" setup>
import type { SidebarMenuLinkProps } from ".";

defineProps<SidebarMenuLinkProps>();
</script>

<template>
  <UVerticalNavigation
    :links="links"
    :ui="{
      wrapper: 'p-4',
      base: 'group flex flex-col !p-3.5 gap-1 before:rounded-full',
      active: 'text-gray-100 before:bg-primary before:hover:bg-primary-600',
      icon: {
        active: 'text-gray-100',
      },
    }"
  />
</template>
