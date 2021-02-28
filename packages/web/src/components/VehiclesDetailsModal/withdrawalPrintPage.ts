import christinoLogo from '~/assets/logo-color.png';
import { useLocalStorage } from '~/hooks';
import { IVehicle } from '~/interfaces';
import { formatDate, formatDocument } from '~/utils/formatString';

interface IWithdrawnBy {
  name: string;
  document: string;
  details: string;
}

export const withdrawalPrintPage = (vehicle: IVehicle, withdrawnBy: IWithdrawnBy, currentURL: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const storage = useLocalStorage();

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">

        <title>PROTOCOLO DE RETIRADA DE DOCUMENTOS</title>

        <style>
          :root {
            --primary: #2B2E33;
            --primaryText: #FFFFFF;
            --secondary: #FF8C00;
            --secondaryText: #FFFFFF;
            --success: #28A745;
            --successText: #FFFFFF;
            --warning: #F5BB00;
            --warningText: #222222;
            --error:#EF3340;
            --errorText: #FFFFFF;
            --info: #4D6DFF;
            --infoText: #FFFFFF;
            --background: #FFFFFF;
            --text: #000000;
            --shadow: 0 0 4px 4px rgba(29, 31, 35, .25);
          }
    
          * {
            margin: 0;
            padding: 0;
            color: var(--text);
            font-family: 'Roboto Mono', monospace;
          }
    
          html, body {
            background: var(--background);
            font-size: 12px;
          }
    
          /* - COMPONENTES PRE-FEITOS - */
          .card {
            box-shadow: none;
            background: #FFFFFF;
            border: 1px solid var(--primary);
    
            position: relative;
            width: auto;
            color: var(--primaryText);
            border-radius: 5px;
            padding: 10px;
          }
    
          .text-container { height: 40px; white-space: nowrap; text-overflow: ellipsis;  }
          .text-container > .label { height: 20px; font-weight: bold; }
          .text-container > div { width: 100%; height: 20px; font-size: 14px; white-space: nowrap; text-overflow: ellipsis; }
          /* END COMPONENTES PRE-FEITOS */
    
          main.container {
            margin: 5px auto;
            max-width: 1080px;
          }
    
          /* - HEADER */
          header {
            display: grid;
            grid-template-columns: 205px 1fr;
            grid-template-rows: 50px;
            grid-template-areas: 'HI HT';
    
          }
    
          header .christino-logo {
            grid-area: HI;
            height: 50px;
          }
    
          header .header-text {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          /* END HEADER */
    
          /* - VEHICLE DATA - */
          .vehicle {
            margin-top: 10px;
    
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
            gap: 15px;
            grid-template-rows: 20px 40px 40px;
            grid-template-areas: 'TL TL TL TL TL TL TL TL TL TL TL TL'
                                 'CN CN CN CN CN CN CN CD CD CD CG CG'
                                 'VP VR VR VC VC VM VM VM VM VM VT VT';
          }
    
          .vehicle-title { grid-area: TL; text-align: center; }
          .vehicle-name { grid-area: CN; }
          .vehicle-document { grid-area: CD; }
          .vehicle-group { grid-area: CG; }
          .vehicle-plate { grid-area: VP; }
          .vehicle-renavam { grid-area: VR; }
          .vehicle-crv { grid-area: VC; }
          .vehicle-brand-model { grid-area: VM; }
          .vehicle-type { grid-area: VT; }
          /* END VEHICLE DATA */
    
          /* - WITHDRAWN BY DATA - */
          .withdrawn-by {
            margin-top: 10px;
            display: grid;
    
            grid-template-columns: 1fr 200px;
            gap: 15px;
            grid-template-rows: 20px 40px 40px;
            grid-template-areas: 'WT WT'
                                 'WN WD'
                                 'WO WI';
          }
          .withdrawn-by-title { grid-area: WT; text-align: center; }
          .withdrawn-by-name { grid-area: WN; }
          .withdrawn-by-document { grid-area: WD; }
          .withdrawn-by-details { grid-area: WO; white-space: normal; text-overflow: ellipsis; }
          /* END WITHDRAWN BY DATA */
    
          .withdrawal-text { margin-top: 15px; font-size: 14px; }
    
          .signatures {
            margin-top: 50px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            grid-template-areas: 'WN CN';
          }
    
          .withdrawn-by-signature { border-top: 1px solid black; text-align: center; grid-area: WN; }
          .christino-signature { border-top: 1px solid black; text-align: center; grid-area: CN; }
        </style>
      </head>
      <body>
        <main class="container">
          <header class="card">
            <img src="${currentURL}${christinoLogo}" class="christino-logo" alt="">
            <div class="header-text">
              <h2>PROTOCOLO DE RETIRADA DE DOCUMENTOS</h2>
              <p>CERTIFICADO DE REGISTRO DO VEÍCULO</p>
            </div>
          </header>
          <section class="card vehicle">
            <h2 class="vehicle-title">DADOS DO VEÍCULO</h2>
            <div class="text-container vehicle-name">
              <div class="label">NOME</div>
              <div>${vehicle.client.name}</div>
            </div>
            <div class="text-container vehicle-document">
              <div class="label">CPF/CNPJ</div>
              <div>${formatDocument(vehicle.client.document)}</div>
            </div>
            <div class="text-container vehicle-group">
              <div class="label">GRUPO</div>
              <div>${vehicle.client?.group || ''}</div>
            </div>
            <div class="text-container vehicle-plate">
              <div class="label">PLACA</div>
              <div>${vehicle.plate}</div>
            </div>
            <div class="text-container vehicle-renavam">
              <div class="label">RENAVAM</div>
              <div>${vehicle.renavam}</div>
            </div>
            <div class="text-container vehicle-crv">
              <div class="label">CRV</div>
              <div>${vehicle?.crv || ''}</div>
            </div>
            <div class="text-container vehicle-brand-model">
              <div class="label">MARCA/MODELO</div>
              <div>${vehicle.brandModel}</div>
            </div>
            <div class="text-container vehicle-type">
              <div class="label">TIPO</div>
              <div>${vehicle.type}</div>
            </div>
          </section>

          <section class="card withdrawn-by">
            <h2 class="withdrawn-by-title">
              RETIRADO POR
            </h2>
            <div class="text-container withdrawn-by-name">
              <div class="label">NOME</div>
              <div>${withdrawnBy.name.toUpperCase()}</div>
            </div>
            <div class="text-container withdrawn-by-document">
              <div class="label">CPF/CNPJ</div>
              <div>${formatDocument(withdrawnBy.document)}</div>
            </div>
            <div class="text-container withdrawn-by-details">
              <div class="label">DETALHES</div>
              <div>${withdrawnBy.details ? withdrawnBy.details.toUpperCase() : ''}</div>
            </div>
            <div class="text-container withdrawn-by-time">
              <div class="label">DATA E HORA</div>
              <div>${formatDate(new Date(Date.now()), true)}</div>
            </div>
          </section>

          <section class="withdrawal-text">
            Eu ${withdrawnBy.name.toUpperCase()} estou retirando o Certificado de Registro do Veículo (CRV) do veículo acima descrito.
          </section>
          <div class="signatures">
            <div class="withdrawn-by-signature">${withdrawnBy.name.toUpperCase()}</div>
            <div class="christino-signature">${storage.getItem('userName')}</div>
          </div>
        </main>
      </body>
    </html>
  `;
};
