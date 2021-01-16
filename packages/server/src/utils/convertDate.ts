export function convertDate(date: string): Date {
  let dateArr = date.split('-');

  if(dateArr.length === 3 && dateArr[0].length === 4 && dateArr[1].length === 2 && dateArr[2].length === 2) {
    return new Date(date);
  }
  dateArr = date.split('/');

  if(dateArr.length === 3 && dateArr[0].length === 2 && dateArr[1].length === 2 && dateArr[2].length === 4) {
    return new Date(parseInt(dateArr[0], 10), parseInt(dateArr[1], 10), parseInt(dateArr[2], 10));
  }

  return null;
}
