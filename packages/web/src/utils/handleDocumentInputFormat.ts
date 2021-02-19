import { FormHandles } from '@unform/core';
import { RefObject } from 'react';
import { toast } from 'react-toastify';

import { formatDocument } from './formatDocument';
import { validCPForCNPJ } from './validCPForCNPJ';

export const onDocumentInputFocus = (formRef: RefObject<FormHandles>, inputName = 'document') => {
  if(formRef.current) {
    const document = formRef.current.getFieldValue(inputName).replace(/\D/g, '');
    formRef.current.setFieldValue(inputName, document);
  }
};

export const onDocumentInputBlur = (formRef: RefObject<FormHandles>, cb?: (document: string) => void, inputName = 'document') => {
  if(formRef.current) {
    const document: string = formRef.current.getFieldValue(inputName).replace(/\D/g, '');

    if(document.length !== 11 && document.length !== 14) {
      toast.error('CPF/CNPJ inválido.');
      return;
    }

    formRef.current.setFieldValue(inputName, formatDocument(document));

    if(!validCPForCNPJ(document)) {
      toast.error('CPF/CNPJ inválido.');
      return;
    }

    if(cb) {
      cb(document);
    }
  }
};
