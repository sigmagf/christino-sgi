export function formatMoney(value: string | number) {
  if(!value) {
    return '';
  }

  const newValue = parseFloat(value.toString()).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  return newValue.replace('R$', '').trim();
}
