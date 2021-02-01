export function statusConverter(status: number|string) {
  if(!status) {
    return 'ERRO';
  }

  const stNum = parseInt(status.toString(), 10);

  switch(stNum) {
    default:
      return '';
    case 0:
      return 'BAIXADO';
    case 1:
      return 'CRLVe';
    case 2:
      return 'CRV';
    case 3:
      return 'OUTRO';
  }
}
