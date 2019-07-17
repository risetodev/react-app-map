export const getAuthentication = () => {
  const value = JSON.parse(localStorage.getItem("loggedIn"));
  return value ? value : null;
};

export const setAuthentication = (value: {
  loggedIn: boolean;
  login: string;
}) => localStorage.setItem("loggedIn", JSON.stringify(value));
