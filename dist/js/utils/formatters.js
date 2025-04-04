import { FormatoData } from "../types/formatoData.js";
export function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        currency: "BRL",
        style: "currency",
    });
}
export function formatarData(data, formato = FormatoData.PADRAO) {
    if (formato === FormatoData.DIA_SEMANA_DIA_MES_ANO) {
        return data.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
    else if (formato === FormatoData.DIA_MES) {
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
        });
    }
    else if (formato == FormatoData.PADRAO) {
        return data.toLocaleDateString("pt-BR");
    }
}
