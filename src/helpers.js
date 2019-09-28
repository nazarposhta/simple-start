/*
* Function parses string with unusual date format
* and return proper date object
*
* @param {string}
* */
export const parseDate = (str) => {
  const monthsMap = {
    januar: 0,
    februar: 1,
    march: 2,
    april: 3,
    mai: 4,
    jun: 5,
    july: 6,
    august: 7,
    september: 8,
    oktober: 9,
    november: 10,
    desember: 11,
  };
  const dayMonthYear = str.split('.');
  const day = parseInt(dayMonthYear[0], 10);
  const monthYear = dayMonthYear[1].trim().split(' ');
  return new Date(monthYear[1], monthsMap[monthYear[0]], day);
};


/**
 * Asynchronous function which executes single GET request to the server by URL
 * @param url
 * @returns {Promise<any>}
 */
export const executeUrl = async (url) => {
  const response = await fetch(`http://localhost:6010${url}`);
  const result = await response.json();
  return result;
}
