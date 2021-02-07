import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';

import { formatCPForCNPJ } from './formatCPForCNPJ';
import { validCPForCNPJ } from './validCPForCNPJ';

export const onDocumentFocus = (formRef: React.RefObject<FormHandles>, documentFieldName = 'document') => {
  if(formRef.current) {
    const document = formRef.current.getFieldValue(documentFieldName).replace(/\D/g, '');
    formRef.current.setFieldValue(documentFieldName, document);
  }
};

export const onDocumentBlur = (formRef: React.RefObject<FormHandles>, cb: (doc: string) => void, documentFieldName = 'document') => {
  if(formRef.current) {
    const document: string = formRef.current.getFieldValue(documentFieldName).replace(/\D/g, '');

    if(document.length === 0 || (document.length !== 11 && document.length !== 14)) {
      toast.error('CPF/CNPJ inválido.');
      return;
    }

    formRef.current.setFieldValue(documentFieldName, formatCPForCNPJ(document));

    if(!validCPForCNPJ(document)) {
      toast.error('CPF/CNPJ inválido.');
      return;
    }

    cb(document);
  }
};
