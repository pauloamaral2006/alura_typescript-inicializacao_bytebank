export function validaDebito(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorDoDebito) {
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
export function validaDeposito(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorDoDeposito) {
        if (valorDoDeposito <= 0) {
            throw Error("O valor a ser depositado dever ser maior que zero!");
        }
        return originalMethod.apply(this, [valorDoDeposito]);
    };
    return descriptor;
}
