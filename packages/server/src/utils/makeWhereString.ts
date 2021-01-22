export function makeWhereString(obj: Record<string, any>, like = true, prefix?: string): string {
  const whereArr: string[] = [];

  Object.keys(obj).forEach((key) => {
    if(obj[key] && obj[key].toString().trim() !== '') {
      const keyName = prefix && !key.includes('.') ? `${prefix}.${key}` : key;

      whereArr.push(like ? `${keyName} LIKE '%${obj[key]}%'` : `${keyName} = '${obj[key]}'`);
    }
  });

  return whereArr.join(' AND ');
}
