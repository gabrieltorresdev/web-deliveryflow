<script setup lang="ts">
import { useAppStore } from "~/store/store";

const sidebarOpen = ref(true);
const route = useRoute();

const appStore = useAppStore();
</script>

<template>
  <div class="text-gray-700">
    <aside class="flex absolute inset-y-0 z-10">
      <div
        class="flex-1 w-20 flex flex-col border-r bg-gray-50 justify-between"
      >
        <div>
          <SidebarMenuLink
            :links="[
              {
                label: '',
                icon: 'fluent:glance-horizontal-32-filled',
                to: '/',
              },
              {
                label: '',
                icon: 'fluent:laptop-32-filled',
                to: '/projetos',
                active: String(route.name).startsWith('projetos'),
              },
            ]"
          />
        </div>
        <div>
          <SidebarMenuLink
            :links="[
              {
                label: 'Perfil',
                icon: 'fluent:person-32-filled',
              },
            ]"
          />
        </div>
      </div>
    </aside>
    <main class="ml-20 h-screen relative">
      <header
        class="absolute border-b inset-x-0 top-0 border-gray-200 px-4 h-16 flex items-center"
      >
        <div>
          <h1
            class="inline-flex items-center font-medium text-xl gap-2"
            v-if="appStore.tituloPagina.length"
          >
            <UIcon :name="appStore.iconePagina" />
            {{ appStore.tituloPagina }}
          </h1>
          <template v-else>
            <div class="flex gap-2">
              <USkeleton class="h-8 w-8" />
              <div class="flex flex-col gap-2">
                <USkeleton class="h-3 w-72" />
                <USkeleton class="h-3 w-64" />
              </div>
            </div>
          </template>
        </div>
      </header>
      <section class="pt-20 p-4 overflow-y-hidden h-full flex-1">
        <slot />
      </section>
    </main>
  </div>
</template>
