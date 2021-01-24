export function formatCPForCNPJ(document: string) {
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
