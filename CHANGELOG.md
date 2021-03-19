### SERVER 0.5.11 | WEB 0.0.25 (05/03/2021)
- **[server]** Adicionado `createdBy` e `updatedBy` nas entidades `vehicle` e `work`;
- **[server]** Movido as interfaces do banco de dados para o package `@christino-sgi/common`;
- **[web]** Movido as interfaces do banco de dados para o package `@christino-sgi/common`;
- Update nos workflows `deploy-heroku.yml` e `deploy-vercel.yml` para acompanhar mudanças no `@christino-sgi/common`;

### SERVER 0.5.12 | WEB 0.0.26 (06/03/2021)
- **[web]** Adicionado graficos na pagina `inicio`;
- **[server]** Arrumado os routers para utilização do `authMiddleware` apenas na rota em questão;
- **[server]** Dado inicio no envio de e-mails por meio do sendingblue para recuperação de e-mail e afins;

### SERVER 0.5.13 | WEB 0.0.27 (07/03/2021)
- **[web]** Adicionado a tela de solicitação e recuperacao de senha;
- **[server]** Finalizado a recuperação de senha utilizando o SES da AWS;

### SERVER 0.5.14 | WEB 0.0.28 (19/03/2021)
- **[web]** Bug fix;
- **[server]** Bug fix;
- Github workflows re-adicionados;