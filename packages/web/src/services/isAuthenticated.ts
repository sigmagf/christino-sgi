export const isAuthenticated = () => {
  const token = localStorage.getItem('@christino-sgi/token');

  if(!token || token === '') {
    return false;
  }

  return true;
};
