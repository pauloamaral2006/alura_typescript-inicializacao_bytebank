import { GrupoTransacao } from "./GrupoTransacao.js";
import { ResumoTransacoes } from "./ResumoTransacoes.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo: number = JSON.parse(localStorage.getItem("sado")) || 0;

const transacoes: Transacao[] =
  JSON.parse(
    localStorage.getItem("transacoes"),
    (key: string, value: string) => {
      if (key == "data") {
        return new Date(value);
      }
      return value;
    }
  ) || [];

function debitar(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser debitado deve ser maior que 0!");
  } else if (valor > saldo) {
    throw new Error("Saldo insuficiente!");
  }
  saldo -= valor;
  localStorage.setItem("sado", saldo.toString());
}

function depositar(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser depositado deve ser maior que 0!");
  }
  saldo += valor;
  localStorage.setItem("sado", saldo.toString());
}

const Conta = {
  getSaldo() {
    return saldo;
  },

  getDataAcesso(): Date {
    return new Date();
  },

  getGruposTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];
    const listaTransacoes: Transacao[] = structuredClone(transacoes);
    const transacoesOrdenadas: Transacao[] = listaTransacoes.sort(
      (t1, t2) => t2.data.getTime() - t1.data.getTime()
    );
    let labelAtualGrupoTransacao: string = "";

    for (let transacao of transacoesOrdenadas) {
      let labelGrupoTransacao: string = transacao.data.toLocaleDateString(
        "pt-BR",
        { month: "long", year: "numeric" }
      );

      if (labelAtualGrupoTransacao != labelGrupoTransacao) {
        labelAtualGrupoTransacao = labelGrupoTransacao;

        gruposTransacoes.push({
          label: labelGrupoTransacao,
          transacoes: [],
        });
      }

      gruposTransacoes.at(-1).transacoes.push(transacao);
    }
    return gruposTransacoes;
  },

  registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
      depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
      novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
    ) {
      debitar(novaTransacao.valor);
      novaTransacao.valor *= -1;
    } else {
      throw new Error("Tipo de transação é inválida!");
    }

    transacoes.push(novaTransacao);
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  },

  agruparTransacoes(): ResumoTransacoes {
    const resumo: ResumoTransacoes = {
      totalDepositos: 0,
      totalTransferencias: 0,
      totalPagamentosBoleto: 0,
    };

    this.transacoes.forEach((transacao) => {
      switch (transacao.tipoTransacao) {
        case TipoTransacao.DEPOSITO:
          resumo.totalDepositos += transacao.valor;
          break;

        case TipoTransacao.TRANSFERENCIA:
          resumo.totalTransferencias += transacao.valor;
          break;

        case TipoTransacao.PAGAMENTO_BOLETO:
          resumo.totalPagamentosBoleto += transacao.valor;
          break;
      }
    });

    return resumo;
  },
};

export default Conta;
