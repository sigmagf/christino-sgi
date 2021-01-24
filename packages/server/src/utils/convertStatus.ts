export function convertStatus(status: string) {
  switch(status) {
    case '0':
    case 'baixado': return 0;

    default:
    case '1':
    case 'crlve': return 1;

    case '2':
    case 'crv': return 2;

    case '3':
    case 'outro':
    case 'xerox': return 3;
  }
}
