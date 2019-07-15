export const getAuthentication = () => {
  const value = JSON.parse(localStorage.getItem("loggedIn"));
  return value ? value : false;
};

export const setAuthentication = (value: boolean) =>
  localStorage.setItem("loggedIn", JSON.stringify(value));
