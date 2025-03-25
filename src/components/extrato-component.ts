import Conta from "../types/Conta.js";
import { FormatoData } from "../types/formatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";

const elementoRegistroTransacoesEstrato: HTMLElement = document.querySelector(
  ".extrato .registro-transacoes"
);

rendereizarExtrato();
function rendereizarExtrato(): void {
  const gruposTransacoes: GrupoTransacao[] = Conta.getGruposTransacoes();
  elementoRegistroTransacoesEstrato.innerHTML = "";
  let htmlRegistroTransacoes: string = "";

  for (let grupoTransacao of gruposTransacoes) {
    let htmlTransacaoItem: string = "";

    for (let transacao of grupoTransacao.transacoes) {
      htmlTransacaoItem += `
        <div class="transacao-item">
            <div class="transacao-info">
                <span class="tipo">${transacao.tipoTransacao}</span>
                <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
            </div>
            <time class="data">${formatarData(
              transacao.data,
              FormatoData.DIA_MES
            )}</time>
        </div>`;
    }

    htmlRegistroTransacoes += `
        <div class="transacoes-group">
            <strong class="mes-group">${grupoTransacao.label}</strong>
            ${htmlTransacaoItem}
        </div>`;
  }

  if (htmlRegistroTransacoes == "") {
    htmlRegistroTransacoes = "<div>Não há transações registradas</div>";
  }

  elementoRegistroTransacoesEstrato.innerHTML = htmlRegistroTransacoes;
}

const ExtratoComponent = {
  atualizar(): void {
    rendereizarExtrato();
  },
};

export default ExtratoComponent;
