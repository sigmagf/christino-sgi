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
    case 'Receipt already exists.':
      return 'Recibo ja cadastrado.';
    case 'No receipt founded.':
    case 'No receipts founded.':
      return 'Nenhum recibo encontrado.';

    /* Users and Auth */
    case 'Invalid password.':
      return 'Senha invalida.';
    case 'User already exists.':
      return 'Usuario ja cadastrado.';
    case 'No user founded.':
    case 'No users founded.':
      return 'Nenhum usuario encontrado.';

    /* Outros */
    case 'Database error.':
      return 'Erro no banco de dados.';
    case 'Unexpected error.':
      return 'Erro inesperado.';
    default:
      return message;
  }
};
