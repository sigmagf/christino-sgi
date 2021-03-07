### SERVER 0.5.11 | WEB 0.0.25
- **[server]** Adicionado `createdBy` e `updatedBy` nas entidades `vehicle` e `work`;
- **[server]** Movido as interfaces do banco de dados para o package `@christino-sgi/common`;
- **[web]** Movido as interfaces do banco de dados para o package `@christino-sgi/common`;
- Update nos workflows `deploy-heroku.yml` e `deploy-vercel.yml` para acompanhar mudanças no `@christino-sgi/common`;

### SERVER 0.5.12 | WEB 0.0.26
- **[web]** Adicionado graficos na pagina `inicio`;
- **[server]** Arrumado os routers para utilização do `authMiddleware` apenas na rota em questão;
- **[server]** Dado inicio no envio de e-mails por meio do sendingblue para recuperação de e-mail e afins;