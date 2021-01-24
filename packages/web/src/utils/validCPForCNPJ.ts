function validCPF(cpf: string) {
  let soma = 0;
  let resto = 0;

  if(cpf === '00000000000' || cpf === '11111111111' || cpf === '22222222222' || cpf === '33333333333'
     || cpf === '44444444444' || cpf === '55555555555' || cpf === '66666666666' || cpf === '77777777777'
     || cpf === '88888888888' || cpf === '99999999999') {
    return false;
  }

  /* Calculo do digito 10 */
  for(let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if((resto === 10) || (resto === 11)) {
    resto = 0;
  }
  if(resto !== parseInt(cpf.substring(9, 10), 10)) {
    return false;
  }

  /* Calculo do digito 11 */
  soma = 0;
  for(let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if((resto === 10) || (resto === 11)) resto = 0;
  if(resto !== parseInt(cpf.substring(10, 11), 10)) {
    return false;
  }

  return true;
}

function validCNPJ(cnpj: string) {
  let soma = 0;
  let resto = 0;

  if(cnpj === '00000000000000' || cnpj === '11111111111111' || cnpj === '22222222222222' || cnpj === '33333333333333'
  || cnpj === '44444444444444' || cnpj === '55555555555555' || cnpj === '66666666666666' || cnpj === '77777777777777'
  || cnpj === '88888888888888' || cnpj === '99999999999999') {
    return false;
  }

  for(let i = 0; i < 12; i++) {
    if(i < 4) {
      soma += parseInt(cnpj[i], 10) * (5 - i);
    }

    if(i >= 4) {
      soma += parseInt(cnpj[i], 10) * (13 - i);
    }
  }

  resto = soma % 11;
  if((resto < 2 ? 0 : 11 - resto).toString() !== cnpj[12]) {
    return false;
  }

  soma = 0;
  for(let i = 0; i < 13; i++) {
    if(i < 5) {
      soma += parseInt(cnpj[i], 10) * (6 - i);
    }

    if(i >= 5) {
      soma += parseInt(cnpj[i], 10) * (14 - i);
    }
  }

  resto = soma % 11;
  if((resto < 2 ? 0 : 11 - resto).toString() !== cnpj[13]) {
    return false;
  }

  return true;
}

export function validCPForCNPJ(document: string) {
  const doc = document.replace(/[^\d]+/g, '');

  if(!doc) {
    return true;
  }

  if(doc.length === 11) {
    return validCPF(doc);
  }

  if(doc.length === 14) {
    return validCNPJ(doc);
  }

  return false;
}
