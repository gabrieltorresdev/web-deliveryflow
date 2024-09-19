<script lang="ts" setup>
import type { CardProjetoProps } from ".";

defineProps<CardProjetoProps>();

function formatarQuantidade(quantidade: number | string): string {
  if (quantidade === 0) {
    return "-";
  }
  return String(quantidade).padStart(2, "0");
}
</script>

<template>
  <UCard
    :ui="{
      rounded: 'rounded-md h-52',
      ring: 'ring-gray-300/60',
      body: {
        padding: 'p-4 sm:p-4 h-full',
      },
    }"
  >
    <div class="flex gap-4 h-full">
      <div class="flex flex-col gap-4 flex-1">
        <div class="flex justify-between">
          <div class="flex items-center gap-2">
            <CardProjetoButtonLinkProjeto :to="`projetos/${projeto.id}`" />

            <h3 class="text-xl tracking-wide font-light">
              {{ projeto.nome }}
            </h3>
          </div>
          <div class="flex flex-col justify-self-end">
            <span class="text-xs text-right">Sprint Atual</span>
            <i class="font-medium text-right">SPRINT-2024-03-01</i>
          </div>
        </div>
        <!-- <UDivider /> -->
        <div class="flex justify-between flex-1">
          <CardProjetoCardAndamentoDemandas
            titulo="A Fazer"
            :quantidade="formatarQuantidade(projeto.demandas_a_fazer)"
          />
          <CardProjetoCardAndamentoDemandas
            titulo="Concluídas"
            :quantidade="formatarQuantidade(projeto.demandas_concluidas)"
          />
          <CardProjetoCardAndamentoDemandas
            titulo="Em Andamento"
            :quantidade="formatarQuantidade(projeto.demandas_em_andamento)"
          />
          <CardProjetoCardAndamentoDemandas
            class="ring-1 ring-gray-200"
            titulo="Total"
            :quantidade="formatarQuantidade(projeto.total_demandas)"
          />
        </div>
      </div>
      <!-- <div
              class="flex flex-col gap-2 ring-1 ring-gray-200 rounded p-4 h-40"
            >
              <h6>Overview Demandas</h6>
              <div class="overflow-y-auto">
                <div class="flex flex-col gap-2">
                  <template v-for="demanda in projeto.demandas">
                    <CardProjetoCardDemanda
                      :titulo="demanda.titulo"
                      :urgencia="demanda.urgencia"
                      :descricao="demanda.descricao"
                    />
                  </template>
                </div>
              </div>
            </div> -->
    </div>
  </UCard>
</template>
