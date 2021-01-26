export function stringFix(string: any, returnIfFalse: null|undefined, stringCase?: 'UPPERCASE'|'LOWERCASE') {
  if(!string) {
    return returnIfFalse;
  }

  switch(stringCase) {
    case 'UPPERCASE': return string.toString().trim().toUpperCase();
    case 'LOWERCASE': return string.toString().trim().toLowerCase();
    default: return string.toString().trim();
  }
}
