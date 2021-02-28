import { IWork } from '~/interfaces';
import { worksStatus } from '~/utils/commonSelectOptions';
import { formatDate, formatMoney } from '~/utils/formatString';

export function worksPrintScreen(vehicles: IWork[]) {
  return `
    <head>
      <title>IMPRESSAO DAS ORDENS DE SERVIÇO</title>
    </head>
    <body>
      <style>
        @page { size: A4 portrait; -webkit-print-color-adjust: exact; }
        * { font-family: 'Roboto Mono', monospace; font-size: 10px; }
        html, body { margin: 0; padding: 0; }
        table { width: 100%; border-radius: 5px; overflow: hidden; border-collapse: collapse; }
        td, th { padding: 8px; }
        thead > tr > th{ font-weight: bold; }
        tbody > tr:nth-child(even) { background: white; }
        tbody > tr:nth-child(odd) { background: lightgray; }
      </style>

      <table>
        <thead>
          <tr>
            <th style="text-align: left">CLIENTE</th>
            <th>IDENTIFICADOR</th>
            <th>SETOR/SERVIÇO</th>
            <th>VALOR</th>
            <th>STATUS</th>
            <th>CRIADO EM</th>
          </tr>
        </thead>
        <tbody>
        ${vehicles.map((w) => `
          <tr>
            <td>${w.client.name}</td>
            <td style="text-align: center">${w.identifier}</td>
            <td style="text-align: center">${w.service.sector.name}/${w.service.name}</td>
            <td style="text-align: center">${formatMoney(w.value)}</td>
            <td style="text-align: center">${worksStatus.find((e) => e.value === w.status.toString())?.label}</td>
            <td style="text-align: center">${formatDate(w.createdAt)}</td>
          </tr>
        `).join('')}
        </tbody>
      </table>
    </body>
  `;
}
