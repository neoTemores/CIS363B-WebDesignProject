loadPage();
function loadPage() {
  setCurrentDate();
}

function setCurrentDate() {
  const today = new Date();
  let day = parseDayOfWeek(today.getDay());
  let date = today.getDate();
  let suffix = parseDateSuffix(date);
  let month = parseMonth(today.getMonth());
  let year = today.getFullYear();

  let dateStr = `Today is ${day}, ${month} ${date}${suffix}, ${year}`;

  let currDateDiv = document.getElementById("currentDate");
  currDateDiv.innerHTML = dateStr;
}

function parseDayOfWeek(day) {
  //date obj can only return day values 0-6
  const dayOfWeekObj = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  return dayOfWeekObj[day];
}

function parseDateSuffix(date) {
  //date obj can only return date values 1-31
  switch (date) {
    case 1:
    case 21:
    case 31:
      return "st";
    case 2:
    case 22:
      return "nd";
    case 3:
    case 23:
      return "rd";
    default:
      return "th";
  }
}

function parseMonth(month) {
  //date obj can only return month values 0-11
  const monthObj = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "Noveber",
    11: "December",
  };
  return monthObj[month];
}
