<script setup lang="ts">
import type { variants } from "#tailwind-config";
import dayjs from "dayjs";
import { useAppStore } from "~/store/store";
import type { IDemanda } from "~/types/demanda/demanda";
import type { IProjeto } from "~/types/projeto";

const appStore = useAppStore();
const route = useRoute();
const idDemandaSelecionada = ref<IDemanda["id"]>();
const avatares = ref<{ [key: string]: string }>({}); // Para armazenar os avatares
const tabSelecionada = ref<number>(1);

onMounted(() => {
  appStore.changeIconePagina("fluent:laptop-32-filled");
  appStore.changeTituloPagina("");
  if (projeto.value?.data) {
    appStore.changeTituloPagina(projeto.value.data.nome);
    if (projeto.value.data?.demandas) {
      gerarAvatares(projeto.value.data.demandas);
    }
  }
});

// Função para selecionar uma demanda
function selecionarDemanda(demandaId: IDemanda["id"]) {
  idDemandaSelecionada.value = demandaId;
}

// Função para determinar a cor da urgência
function getCorUrgencia(urgencia: string): "red" | "amber" | "blue" {
  switch (urgencia) {
    case "alta":
      return "red";
    case "média":
      return "amber";
    default:
      return "blue";
  }
}

// Função para gerar um avatar aleatório
function getRandomAvatarLink(): string {
  return `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
}

// Função para gerar avatares para todas as demandas
function gerarAvatares(demandas: IDemanda[]) {
  demandas.forEach((demanda) => {
    if (!avatares.value[demanda.id]) {
      avatares.value[demanda.id] = getRandomAvatarLink();
    }
  });
}

const { data: projeto, status } = await useLazyFetch<{ data: IProjeto }>(
  `http://localhost:8000/api/v1/projetos/${route.params.id}`,
  {
    server: false,
  }
);

const { data: demandaSelecionada, status: statusDemanda } = await useFetch<{
  data: IDemanda;
}>(
  () => `http://localhost:8000/api/v1/demandas/${idDemandaSelecionada.value}`,
  {
    immediate: false,
  }
);

watch(projeto, (newProjeto) => {
  if (newProjeto?.data) {
    appStore.changeTituloPagina(newProjeto?.data.nome);
    if (newProjeto.data?.demandas) {
      gerarAvatares(newProjeto.data.demandas);
    }
  }
});
</script>

<template>
  <div class="flex h-full">
    <div
      class="flex flex-col min-h-full gap-4 pr-4 pb-1 w-full max-w-[20rem] overflow-x-hidden overflow-y-scroll"
    >
      <template
        v-for="demanda in projeto.data.demandas"
        v-if="projeto?.data"
        :key="demanda.id"
      >
        <UCard
          @click="selecionarDemanda(demanda.id)"
          draggable="true"
          :class="`hover:bg-gray-50 cursor-pointer border-2 border-gray-100 ring-0 ${
            idDemandaSelecionada === demanda.id
              ? 'border-primary/30'
              : 'opacity-90'
          }`"
          color="white"
          :ui="{
            body: {
              padding: 'sm:p-4',
              ring: '',
            },
          }"
        >
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <div class="flex justify-start items-center gap-2">
                <UAvatar size="xs" :src="avatares[demanda.id]" alt="?" />
                <strong class="text-sm font-normal">{{
                  demanda.jira_id
                }}</strong>
              </div>
              <div>
                <UBadge
                  :color="getCorUrgencia(demanda.urgencia)"
                  :label="demanda.urgencia"
                  variant="solid"
                  size="xs"
                  class="rounded-full"
                />
              </div>
            </div>
            <div class="truncate">
              <strong class="font-medium">{{ demanda.titulo }}</strong>
            </div>
          </div>
        </UCard>
      </template>
    </div>
    <div
      v-if="demandaSelecionada?.data && statusDemanda === 'success'"
      class="flex flex-col flex-1"
    >
      <header class="flex flex-col px-4">
        <div class="flex gap-4 items-center">
          <UAvatar size="xl" :src="avatares[demandaSelecionada.data.id]" />
          <div class="flex flex-col gap-2 flex-1">
            <UTextarea
              autoresize
              :rows="1"
              v-model="demandaSelecionada.data.titulo"
              variant="none"
              class="-ml-2 rounded text-2xl w-full"
              :ui="{
                variant: {
                  none: 'bg-transparent hover:bg-gray-100 focus:shadow-none focus:bg-gray-100 focus:ring-2 focus:ring-primary-500 text-2xl p-2 py-1 transition-all',
                },
              }"
            />
            <div>
              <div class="flex items-center gap-2">
                <UBadge
                  :color="getCorUrgencia(demandaSelecionada.data.urgencia)"
                  :label="demandaSelecionada.data.urgencia"
                  variant="solid"
                  size="xs"
                />
                <strong class="font-light">{{
                  demandaSelecionada.data.jira_id
                }}</strong>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="flex flex-col flex-1 overflow-y-auto gap-4 pt-4 px-4">
        <HtmlEditor :value="demandaSelecionada.data.descricao" />

        <UHorizontalNavigation
          :links="[
            {
              icon: 'fluent:chat-24-regular',
              label: 'Comentários',
              // badge: 100,
              active: true,
            },
            {
              icon: 'fluent:history-24-regular',
              label: 'Histórico',
              badge: 100,
            },
          ]"
          :ui="{
            base: 'p-2 rounded-none',
            before: 'hover:bg-transparent',
            active: 'text-gray-900 after:bg-primary-500 after:inset-x-0',
          }"
        />
        <div class="flex flex-col gap-4 flex-1">
          <template
            v-for="comentario in demandaSelecionada.data.comentarios"
            :key="comentario.id"
          >
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <UAvatar
                  size="xs"
                  class="self-start"
                  :src="avatares[demandaSelecionada.data.id]"
                />
                <div class="flex flex-col">
                  <div class="flex flex-col">
                    <div class="flex gap-2 items-baseline">
                      <strong class="font-medium text-sm">{{
                        comentario.autor
                      }}</strong>
                      <span class="text-xs opacity-70">{{
                        dayjs(comentario.created_at).format(
                          "DD/MM/YYYY [às] HH:mm"
                        )
                      }}</span>
                    </div>
                    <span class="font-light text-sm py-2">{{
                      comentario.conteudo
                    }}</span>
                  </div>
                  <div class="flex">
                    <UButton
                      :padded="false"
                      variant="soft"
                      color="black"
                      :ui="{ rounded: 'rounded-full' }"
                      icon="fluent:thumb-like-24-filled"
                      size="2xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <USkeleton class="flex-1 h-full ml-4" v-else />
  </div>
</template>
