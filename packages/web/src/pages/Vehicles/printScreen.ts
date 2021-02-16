import { IVehicle } from '~/interfaces';
import { vehicleStatus } from '~/utils/commonSelectOptions';

export function VehiclesPrintScreen(vehicles: IVehicle[]) {
  return `
    <style>
      @page { size: landscape; -webkit-print-color-adjust: exact; }
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
          <th style="text-align: left">CLIENTE</th>
          <th>PLACA</th>
          <th>RENAVAM</th>
          <th>CRV</th>
          <th>MARCA/MODELO</th>
          <th>TIPO</th>
          <th>DETALHES</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
      ${vehicles.map((v) => `
        <tr>
          <td>${v.client.document.padStart(14, '*')} - ${v.client.name}</td>
          <td style="text-align: center">${v.plate}</td>
          <td style="text-align: center">${v.renavam.padStart(11, '0')}</td>
          <td style="text-align: center">${(v.crv || '').padStart(12, '0')}</td>
          <td style="text-align: center">${v.brandModel}</td>
          <td style="text-align: center">${v.type}</td>
          <td style="text-align: center">${v.details || ''}</td>
          <td style="text-align: center">${vehicleStatus.find((el) => el.value === v.status.toString())?.label}</td>
        </tr>
      `).join('')}
      </tbody>
    </table>
  `;
}
