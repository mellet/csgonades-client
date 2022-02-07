export function prettyDate(date: Date | string) {
  const jsDate = typeof date === "string" ? new Date(date) : date;

  const month = months[jsDate.getMonth()];
  const dateNumber = jsDate.getDate();
  const year = jsDate.getFullYear();

  return `${month} ${dateNumber}. ${year}`;
}

export function dateFromStringOrDate(date: Date | string) {
  if (typeof date === "string") {
    return new Date(date);
  } else {
    return date;
  }
}

export function prettyDateTime(date: Date | string) {
  const jsDate = typeof date === "string" ? new Date(date) : date;

  const month = months[jsDate.getMonth()];
  const dateNumber = jsDate.getDate();
  const year = jsDate.getFullYear();
  let hours: number | string = jsDate.getHours();
  let minutes: number | string = jsDate.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }

  return `${month} ${dateNumber}. ${year} ${hours}:${minutes}`;
}

const months = {
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
  10: "November",
  11: "December",
};

export function dateMinutesAgo(date: Date | string) {
  try {
    const now = new Date();
    const jsDate = typeof date === "string" ? new Date(date) : date;
    const dif = now.getTime() - jsDate.getTime();

    const SecondsFromNowAndThen = dif / 1000;
    const secondsBetweenDates = Math.abs(SecondsFromNowAndThen);

    return secondsBetweenDates / 60;
  } catch (error) {
    return 1;
  }
}

export function timeSince(date: Date | string) {
  const theDate = typeof date === "string" ? new Date(date) : date;
  // @ts-ignore
  const seconds = Math.floor((new Date() - theDate) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
