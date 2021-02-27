import { FormHandles } from '@unform/core';
import { RefObject } from 'react';
import { toast } from 'react-toastify';

import { formatDocument, formatMoney, formatPhone } from './formatString';
import { validCPForCNPJ } from './validCPForCNPJ';

/* DOCUMENT INPUT */
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

/* MONEY INPUT */
export const onValueInputFocus = (formRef: RefObject<FormHandles>, inputName = 'value') => {
  if(formRef.current) {
    const value = formRef.current.getFieldValue(inputName).replace('.', '');
    formRef.current.setFieldValue(inputName, value);
  }
};

export const onValueInputBlur = (formRef: RefObject<FormHandles>, cb?: (value: string) => void, inputName = 'value') => {
  if(formRef.current) {
    const value = formRef.current.getFieldValue(inputName).replace(',', '.');
    formRef.current.setFieldValue(inputName, formatMoney(value));

    if(cb) {
      cb(value);
    }
  }
};

/* PHONE INPUT */
export const onPhoneInputFocus = (formRef: React.RefObject<FormHandles>, field = 'phone') => {
  if(formRef.current) {
    const phone = formRef.current.getFieldValue(field);
    formRef.current.setFieldValue(field, phone.replace(/\D/g, ''));
  }
};

export const onPhoneInputBlur = (formRef: React.RefObject<FormHandles>, field = 'phone') => {
  if(formRef.current) {
    const phone = formRef.current.getFieldValue(field).replace(/\D/g, '');

    if(phone.length !== 10 && phone.length !== 11) {
      toast.error('Telefone inválido.');
      return;
    }

    formRef.current.setFieldValue(field, formatPhone(phone));
  }
};

/* INPUT FORCED MAX LENGTH */
export function onInputBlurMaxLength(formRef: React.RefObject<FormHandles>, inputName: string, maxLength: number, fillString: string) {
  if(formRef.current) {
    const inputVal: string = formRef.current.getFieldValue(inputName).replace(/\D/g, '');

    if(inputVal.length > maxLength) {
      toast.error(`O campo deve ter no máximo ${maxLength} caracteres`);
    }

    formRef.current.setFieldValue(inputName, inputVal.padStart(maxLength, fillString));
  }
}
