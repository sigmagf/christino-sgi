const isAuthenticated = async () => {
  const token = localStorage.getItem('@christino-sgi/token');

  if(token) {
    return true;
  }
  return false;
};

export default isAuthenticated;
