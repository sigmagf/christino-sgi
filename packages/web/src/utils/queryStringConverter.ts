function filterNullOrEmpty(str: string|number|null) {
  return str !== null && str.toString().trim() !== '';
}

function strTrim(str: string|number) {
  return str.toString().trim();
}

export function qsConverter<T>(object: T) {
  const keys = Object.keys(object);

  const qsArray = keys.map((key) => {
    if(object[key] === null || (!Array.isArray(object[key]) && strTrim(object[key] as string|number) === '')) {
      return null;
    }

    if(!Array.isArray(object[key])) {
      return `${key}=${strTrim(object[key] as string|number)}`;
    }

    return (object[key] as Array<string|number>).filter(filterNullOrEmpty).map((el) => `${key}=${strTrim(el)}`).join('&');
  });

  return `?${qsArray.filter(filterNullOrEmpty).join('&')}`;
}
