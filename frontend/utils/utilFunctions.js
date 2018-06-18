export function logger(text) {
  console.log('LOGGER ', text);
}

export function shortenText(maxLength, text) {
  // trim the string to the maximum length
  let trimmedString = text.substr(0, maxLength);
  // re-trim if we are in the middle of a word
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')),
  );
  if (text.length > maxLength) trimmedString = `${trimmedString} ...`;
  return trimmedString;
}

export function utilDate(timestamp) {
  const dateTimeString = new Date(timestamp);
  const dateString = dateTimeString.toLocaleDateString();
  const currentTimestamp = +new Date();
  const currentDateTimeString = new Date(currentTimestamp);
  const currentDateString = currentDateTimeString.toLocaleDateString();
  // check if older then 24 hours
  // console.log('\n timestamp form DB: ', new Date(timestamp));
  // console.log('timestamp current: ', new Date(new Date()));
  // if (timestamp > currentTimestamp) {
  //   return null;
  // } else if (timestamp + 60 > currentTimestamp) {
  //   return 'gerade eben';
  // } else if (timestamp + 3600 > currentTimestamp) {
  //   const differenceInMin = (currentTimestamp - timestamp) / 60;
  //   return `vor ${differenceInMin} Minuten`;
  // } else if (timestamp + 3600 * 24 > currentTimestamp) {
  //   const differenceInHours = (currentTimestamp - timestamp) / 3600;
  //   return `vor ${differenceInHours} Stunden`;
  // }
  if (dateString === currentDateString) return 'heute';
  // const dateTimeStringPlusOneDay = new Date(timestamp);
  // const dateStringPlusOneDay = dateTimeStringPlusOneDay.toLocaleDateString();
  // console.log('dateStringPlusOneDay', dateStringPlusOneDay);
  // console.log('currentDateString', currentDateString);
  // if (dateStringPlusOneDay === currentDateString) return 'gestern';
  return dateString;
}
