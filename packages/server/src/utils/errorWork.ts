type ErrorResponseType = {
  type: string;
  message: string;
  details: string;
}

export function errorWork(message: string): ErrorResponseType {
  if(message !== null && message.includes('IMPORTERROR-')) {
    const data = JSON.parse(message.replace('IMPORTERROR-', ''));

    return {
      type: 'PARTIAL INVALID DATA',
      message: 'One or more entries not saved',
      details: data,
    };
  }

  switch(message) {
    case 'Invalid file type':
    case 'Obrigatory items not informed':
    case 'Client not informed':
    case 'Data is not array':
      return {
        type: 'INVALID DATA',
        message: message || 'Unexprected error',
        details: '',
      };

    case 'Client already exists':
    case 'User already exists':
    case 'Renavam already exists for this client':
    case 'Plate already exists for this client':
      return {
        type: 'DUPLICATED ENTRY',
        message: message || 'Unexprected error',
        details: '',
      };

    case 'Client not founded':
    case 'User not founded':
    case 'Vehicle not founded':
      return {
        type: 'ENTRY NOT FOUND',
        message: message || 'Unexprected error',
        details: '',
      };

    case 'Invalid password':
      return {
        type: 'UNAUTHORIZED',
        message: message || 'Unexprected error',
        details: '',
      };

    default:
    case '':
      return {
        type: 'UNEXPECTED',
        message: message || 'Unexprected error',
        details: '',
      };
  }
}
