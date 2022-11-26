export const validateEmail = (email) => {
  return (
    /^\w+([\.-]?\w+)*@gmail\.*(\w{2,3})+$/.test(email) ||
    /^\w+([\.-]?\w+)*@outlook\.*(\w{2,3})+$/.test(email) ||
    /^\w+([\.-]?\w+)*@yahoo\.*(\w{2,3})+$/.test(email) ||
    /^\w+([\.-]?\w+)*@msn\.*(\w{2,3})+$/.test(email) ||
    /^\w+([\.-]?\w+)*@microsoft\.*(\w{2,3})+$/.test(email) ||
    /^\w+([\.-]?\w+)*@(\w{2,9}).*(\w{2,3})+$/.test(email)
  );
};

export const validatePassword = (passowrd) => {
  return /^[A-Za-z0-9_\.\-\@\#\!\%\^\$]{6,}$/.test(passowrd);
};

export const validateName = (name) => {
  return /^[a-zA-Z ]{2,30}$/.test(name);
};

export const validateTowFactorAuthNumber = (number) => {
  return /^[0-9]{10}$/.test(number);
};

export const validateNumber = (number) => {
  return /^[+]?[0-9]{12}$/.test(number);
};

export const validateUAE_Number = (number) => {
  return /^(?:\+971|00971|0)(?:2|3|4|6|7|9|50|51|52|55|56)[0-9]{7}$/.test(
    number
  );
};

export const validateUAE_Number_test = (number) => {
  return /^(97)[0-9]{10}$/.test(number);
};

export const validateAddress = (address) => {
  return /^[a-zA-Z0-9\s,'-/]*$/.test(address);
};

export const validateCity = (city) => {
  return /^[A-Za-z]{3,}$/.test(city);
};
export const validateState = (state) => {
  return /^[A-Za-z]{3,}$/.test(state);
};

export const validateZip = (Zip) => {
  return /^[0-9]{5}[-\s]?(?:[0-9]{4})?$/.test(Zip);
};

const visaRegex = /^\[0-9]{5}[-\s]?(?:[0-9]{4})?$/;
const masterCardRegex = /^(?:5[1-5][0-9]{14})$/;
const amexpRegEx = /^(?:3[47][0-9]{13})$/;
const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

export const validateCard = (Card) => {
  return (
    visaRegex.test(Card) ||
    masterCardRegex.test(Card) ||
    amexpRegEx.test(Card) ||
    discovRegEx.test(Card)
  );
};

export const validateDate = (date) => {
  return /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(
    date
  );
};

export const validateUserInfo = (userInfo) => {
  return /^[a-zA-Z0-9\s,'-/]*$/.test(userInfo);
};
export const makingValidName = (name) => {
  const strname = name.toString().replace(/[^a-z\d\s]+/gi, "");
  if (/\s$/.test(strname)) {
    return strname.slice(0, -1).replace(/\s+/g, "-").toLowerCase();
  } else {
    return strname.replace(/\s+/g, "-").toLowerCase();
  }
};
