export function formatDate(date?: string|Date, withTime = false) {
  if(!date) {
    return '';
  }

  const dt = new Date(date);

  const year = dt.getFullYear();
  const month = (dt.getMonth() + 1).toString().padStart(2, '0');
  const day = dt.getDate().toString().padStart(2, '0');
  const hour = dt.getHours().toString().padStart(2, '0');
  const minute = dt.getMinutes().toString().padStart(2, '0');

  if(withTime) {
    return `${day}/${month}/${year}-${hour}:${minute}`;
  }

  return `${day}/${month}/${year}`;
}
