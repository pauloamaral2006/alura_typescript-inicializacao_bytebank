export function validaDebito(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (valorDoDebito: number) {
    if (valorDoDebito <= 0) {
      throw Error("O valor a ser debitado precisa ser maior que zero!");
    }

    if (valorDoDebito > this.sado) {
      throw new Error("Seu saldo é insuficiente para realizar a operação");
    }

    return originalMethod.apply(this, [valorDoDebito]);
  };

  return descriptor;
}

export function validaDeposito(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (valorDoDeposito: number) {
    if (valorDoDeposito <= 0) {
      throw Error("O valor a ser depositado dever ser maior que zero!");
    }

    return originalMethod.apply(this, [valorDoDeposito]);
  };

  return descriptor;
}
