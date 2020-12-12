export const translateTranslateMessages = (message: string) => {
  switch(message) {
    /* Vehicles */
    case 'Two diferent entries founded in database.':
      return 'Duas entradas diferentes foram encontradas no banco de dados.';
    case 'Vehicle already exists with plate.':
      return 'Veiculo com esta placa ja cadastrado.';
    case 'Vehicle already exists with renavam.':
      return 'Veiculo com este renavam ja cadastrado.';
    case 'No vehicle founded.':
    case 'No vehicles founded.':
      return 'Nenhum veiculo encontrado.';

    /* Clients */
    case 'Client already exists.':
      return 'Cliente ja cadastrado.';
    case 'No client founded.':
    case 'No clients founded.':
      return 'Nenhum cliente encontrado.';

    /* Receipts */
    case 'Crv already exists.':
      return 'Crv ja cadastrado.';
    case 'No crv founded.':
    case 'No crvs founded.':
      return 'Nenhum crv encontrado.';

    /* Users and Auth */
    case 'Invalid password.':
      return 'Senha invalida.';
    case 'User already exists.':
      return 'Usuario ja cadastrado.';
    case 'No user founded.':
    case 'No users founded.':
      return 'Nenhum usuario encontrado.';

    /* Token validation */
    case 'No token provided.':
      return 'Nenhum token detectado.';
    case 'Token error.':
      return 'Erro no token.';
    case 'Token malformated.':
      return 'Token malformatado.';
    case 'Token invalid.':
      return 'Token invalido.';
    case 'Token user not found.':
      return 'Usuario do token nao encontrado.';

    /* Outros */
    case 'Invalid sended data.':
      return 'Dados enviados invalidos.';
    case 'Database error.':
      return 'Erro no banco de dados.';
    case 'Unexpected error.':
      return 'Erro inesperado.';
    default:
      return message;
  }
};
