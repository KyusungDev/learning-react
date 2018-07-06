export const getDayOfWeek = day =>
  ['일', '월', '화', '수', '목', '금', '토'][day];

export const getDateString = (month, date) => `${month + 1}월 ${date}일`;

export const getFullDateString = (month, date, day) =>
  `${month + 1}월 ${date}일 (${getDayOfWeek(day)})`;

export const getTodayString = () => {
  const today = new Date();
  return getDateString(today.getMonth(), today.getDate(), today.getDay());
};
