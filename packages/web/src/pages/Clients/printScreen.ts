import { IClient } from '~/interfaces';

export function ClientsPrintScreen(clients: IClient[]) {
  return `
  <style>
    @page { size: portrait; -webkit-print-color-adjust: exact; }
    * { font-family: 'Roboto Mono', monospace; font-size: 10px; }
    html, body { margin: 0; padding: 0; }
    table { width: 100%; border-radius: 5px; overflow: hidden; border-collapse: collapse; }
    td, th { padding: 8px; }
    thead > tr > th{ font-weight: 800; }
    tbody > tr:nth-child(even) { background: white; }
    tbody > tr:nth-child(odd) { background: lightgray; }
  </style>

  <table>
    <thead>
      <tr>
        <th style="text-align: left">Nome</th>
        <th>CPF/CNPJ</th>
        <th>GRUPO</th>
        <th>EMAIL</th>
        <th>TELEFONES</th>
      </tr>
    </thead>
    <tbody>
    ${clients.map((v) => `
      <tr>
        <td>${v.name}</td>
        <td style="text-align: center">${v.document}</td>
        <td style="text-align: center">${v.group || ''}</td>
        <td style="text-align: center">${v.email || ''}</td>
        <td style="text-align: center">${v.phone2 && v.phone1 ? `${v.phone1}\n${v.phone2}` : `${v.phone1 || ''}${v.phone2 || ''}`}</td>
      </tr>
    `).join('')}
    </tbody>
  </table>
`;
}
