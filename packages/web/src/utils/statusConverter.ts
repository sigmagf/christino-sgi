export function statusConverter(status: string|number) {
  const stNum = parseInt(status.toString(), 10);

  switch(stNum) {
    default:
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
