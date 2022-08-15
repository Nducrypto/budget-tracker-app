const FormatDate = (date) => {
  const d = new Date(date);
  let month = `${d.getMonth() * 1}`;
  const day = `${d.getDate()}`;
  const year = d.getFullYear();

  //   dis if was used to prevent d date nd month 4rm showin only one digit e,g 1-12-2022 rather show 01-12-2022
  if (month.length < 2) {
    month = `0${month}`;
  }

  //   SECOND if STATEMENT 4 DAY
  if (day.length < 2) {
    day = `0${day}`;
  }

  //dis return is hw d date will look nd i joined it with a dash in between

  return [year, month, day].join("-");
};

export default FormatDate;
