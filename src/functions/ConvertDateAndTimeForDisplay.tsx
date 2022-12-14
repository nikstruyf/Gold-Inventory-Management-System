export default function ConvertDateAndTimeForDisplay(dateAndTime: string) {
  const dateNTime = dateAndTime.split('T', 2);
  const date = dateNTime[0].split('-', 3);
  let time = dateNTime[1].split('.', 1);
  time = time[0].split(':', 2);
  return `${time[0]}:${time[1]} ${date[2]}/${date[1]}/${date[0]}`;
}
