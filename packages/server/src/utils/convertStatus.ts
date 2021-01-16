export function convertStatus(status: string): 0|1|2|3 {
  switch(status) {
    case 'baixado': return 0;
    default:
    case 'crlve': return 1;
    case 'crv': return 2;
    case 'outro':
    case 'xerox': return 3;
  }
}
