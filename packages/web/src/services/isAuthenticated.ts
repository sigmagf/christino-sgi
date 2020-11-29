export const isAuthenticated = () => {
  const token = localStorage.getItem('@christino-sgi/token');

  if(token !== null) {
    return true;
  }

  return false;
};
