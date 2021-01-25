export function makeWhereString(obj: Record<string, any>, like = true, prefix?: string): string {
  const whereArr: string[] = [];

  Object.keys(obj).forEach((key) => {
    if(obj[key]) {
      const keyName = prefix && !key.includes('.') ? `${prefix}.${key}` : key;

      if(Array.isArray(obj[key])) {
        const statusPart: string[] = [];

        obj[key].filter((el) => !!el).forEach((el) => {
          statusPart.push(like ? `${keyName} LIKE '%${el}%'` : `${keyName} = '${el}'`);
        });

        whereArr.push(statusPart.join(' OR '));
      } else if(obj[key].toString().trim()) {
        whereArr.push(like ? `${keyName} LIKE '%${obj[key]}%'` : `${keyName} = '${obj[key]}'`);
      }
    }
  });

  return whereArr.join(' AND ');
}
