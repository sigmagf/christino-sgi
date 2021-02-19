export function formatDate(date?: string|Date, withTime = false) {
  if(!date) {
    return '';
  }

  const dt = new Date(date);

  if(withTime) {
    return `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear()}-${dt.getHours()}:${dt.getMinutes()}`;
  }

  return `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear()}`;
}
