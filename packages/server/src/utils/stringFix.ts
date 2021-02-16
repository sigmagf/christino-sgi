export function stringFix(string: any, returnIfFalse: null|string|number, stringCase?: 'UPPERCASE'|'LOWERCASE') {
  if(!string) {
    return returnIfFalse;
  }

  if(Array.isArray(string)) {
    return string;
  }

  switch(stringCase) {
    case 'UPPERCASE': return string.toString().trim().toUpperCase();
    case 'LOWERCASE': return string.toString().trim().toLowerCase();
    default: return string.toString().trim();
  }
}
