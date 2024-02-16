export const getTodayDate = () => {
  let today = new Date();
  const offset = today.getTimezoneOffset();
  today = new Date(today.getTime() - offset * 60 * 1000);
  return today.toISOString().split("T")[0];
};

export const getCurrentDateTime = () => {
  const now = new Date();
  const time = now.getTime();
  const date = getTodayDate();
  return date + "," + time;
};

export const STORAGE_KEY_HISTORY = "qr-history"; // Note: Do not use underscore("_") in key!
