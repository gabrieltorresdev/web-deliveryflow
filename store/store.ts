import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
    const tituloPagina = ref<string>("");
    const iconePagina = ref<string>("");

    function changeTituloPagina(titulo: string) {
        tituloPagina.value = titulo;
    }

    function changeIconePagina(icone: string) {
        iconePagina.value = icone;
    }

    return {
        tituloPagina,
        changeTituloPagina,
        iconePagina,
        changeIconePagina,
    }
})