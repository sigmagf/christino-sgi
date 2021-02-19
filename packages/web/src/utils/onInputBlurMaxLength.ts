import { FormHandles } from '@unform/core';

export function onInputBlurMaxLength(formRef: React.RefObject<FormHandles>, inputName: string, maxLength: number, fillString: string) {
  if(formRef.current) {
    const inputVal: string = formRef.current.getFieldValue(inputName).replace(/\D/g, '');

    if(inputVal) {
      formRef.current.setFieldValue(inputName, inputVal.padStart(maxLength, fillString));
    }
  }
}
