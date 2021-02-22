type StringCase = 'NONE'|'UPPERCASE'|'LOWERCASE';
type Normalize = 'NUMBER'|'STRING'|'MONEY';

export function stringFix(value: any, undefinedReturn: undefined|null|string|number, stringCase?: StringCase, normalize?: Normalize): any {
  if(!value) {
    return undefinedReturn;
  }

  if(Array.isArray(value)) {
    return value;
  }

  let stringCased = '';

  switch(stringCase) {
    case 'UPPERCASE':
      stringCased = value.toString().trim().toUpperCase();
      break;
    case 'LOWERCASE':
      stringCased = value.toString().trim().toLowerCase();
      break;
    default:
      stringCased = value.toString().trim();
      break;
  }

  if(normalize === 'MONEY') {
    return parseFloat(stringCased);
  }

  if(normalize === 'NUMBER') {
    return stringCased.replace(/\D/g, '');
  }

  if(normalize === 'STRING') {
    return stringCased.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  return stringCased;
}
