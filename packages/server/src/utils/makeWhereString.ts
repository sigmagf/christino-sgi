export function makeWhereString(obj: Record<string, any>, like = true): string {
  const whereArr: string[] = [];

  Object.keys(obj).forEach((key) => {
    if(obj[key] && obj[key].toString().trim() !== '') {
      whereArr.push(like ? `${key} LIKE '%${obj[key]}%'` : `${key} = '${obj[key]}'`);
    }
  });

  return whereArr.join(' AND ');
}
