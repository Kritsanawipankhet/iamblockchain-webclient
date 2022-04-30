export const regExpEmail = (_email: string): boolean => {
  return !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
    _email
  );
};

export const regExpName = (_name: string): boolean => {
  return !/^[a-z0-9\s]+[a-z0-9\s]*$/gi.test(_name);
};
