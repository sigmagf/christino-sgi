export function formatMoney(value: string|number) {
  if(!value) {
    return '';
  }

  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).replace('R$', '').trim();
}
