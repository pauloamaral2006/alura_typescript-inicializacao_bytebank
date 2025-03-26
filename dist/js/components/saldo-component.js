import Conta from "../types/Conta.js";
import { FormatoData } from "../types/formatoData.js";
import { formatarMoeda, formatarData } from "../utils/formatters.js";
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoDataAcesso = document.querySelector("time");
if (elementoDataAcesso != null) {
    const dataAcesso = Conta.getDataAcesso();
    elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO);
}
renderizarSaldo();
export function renderizarSaldo() {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatarMoeda(parseFloat(Conta.getSaldo().toString()));
    }
}
const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    },
};
export default SaldoComponent;
