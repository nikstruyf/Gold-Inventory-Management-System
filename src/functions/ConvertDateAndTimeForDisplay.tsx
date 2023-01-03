export function SplitDateAndTime(dateAndTime: string) {
  if (dateAndTime === '' || !dateAndTime) {
    return '';
  }
  const dateNTime = dateAndTime.split('T', 2);
  const date = dateNTime[0].split('-', 3);
  let time = dateNTime[1].split('.', 1);
  time = time[0].split(':', 2);
  return `${time[0]}:${time[1]} ${date[2]}/${date[1]}/${date[0]}`;
}

export function ConvertDateForDisplay(dateAndTime: string) {
  if (dateAndTime === '' || !dateAndTime) {
    return ['', '', ''];
  }
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const dateNTime = SplitDateAndTime(dateAndTime);
  let date = dateNTime.split(' ');
  date = date[1].split('/');
  return [date[0], month[Number(date[1]) - 1], date[2]];
}

export function ConvertDateFoCal(dateAndTime: string) {
  const res = SplitDateAndTime(dateAndTime).split(' ')[1];
  return `${res.split('/')[2]}-${res.split('/')[1]}-${res.split('/')[0]}`;
}
