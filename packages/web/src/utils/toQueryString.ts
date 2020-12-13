export const toQueryString = <T>(obj: T, autojoin = true, caseChange: -1|0|1 = 0) => {
  if(!obj) {
    return '';
  }

  const caseFix = (e: string) => {
    switch(caseChange) {
      case -1: return e.toLowerCase();
      default:
      case 0: return e;
      case 1: return e.toUpperCase();
    }
  };

  const qs = Object.keys(obj)
    .filter((k) => obj[k] !== '' && obj[k] !== null)
    .map((k) => `${k}=${caseFix(obj[k].toString())}`);

  return autojoin ? qs.join('&') : qs;
};
