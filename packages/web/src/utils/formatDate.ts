export function formatDate(date?: string|Date) {
  if(!date) {
    return '';
  }

  const dt = new Date(date);
  return `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getFullYear()}`;
}
