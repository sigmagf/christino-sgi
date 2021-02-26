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

export function formatDatabaseDate(date?: string|Date) {
  if(!date) {
    return '';
  }

  const dt = new Date(date);

  const year = dt.getFullYear();
  const month = (dt.getMonth() + 1).toString().padStart(2, '0');
  const day = dt.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDocument(document: string) {
  if(!document) {
    return '';
  }

  let doc = document.replace(/\D/g, '');

  if(document.length === 14) {
    doc = document.replace(/^(\d{2})(\d)/, '$1.$2');
    doc = doc.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    doc = doc.replace(/\.(\d{3})(\d)/, '.$1/$2');
    doc = doc.replace(/(\d{4})(\d)/, '$1-$2');
  } else if(document.length === 11) {
    doc = document.replace(/(\d{3})(\d)/, '$1.$2');
    doc = doc.replace(/(\d{3})(\d)/, '$1.$2');
    doc = doc.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  return doc;
}

export function formatMoney(value: string | number) {
  if(!value) {
    return '';
  }

  const newValue = parseFloat(value.toString()).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  return newValue.replace('R$', '').trim();
}

export function formatPhone(phone: string) {
  if(!phone) {
    return '';
  }

  const phoneFormat = phone.replace(/\D/g, '');

  if(phoneFormat.length === 10) {
    return `(${phoneFormat.slice(0, 2)}) ${phoneFormat.slice(2, 6)}-${phoneFormat.slice(6, 10)}`;
  }

  if(phoneFormat.length === 11) {
    return `(${phoneFormat.slice(0, 2)}) ${phoneFormat.slice(2, 7)}-${phoneFormat.slice(7, 11)}`;
  }

  return phoneFormat;
}
