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

export function dateDiff(d1, d2) {
  var date1 = new Date(d1);
  var date2 = new Date(d2);
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
}
