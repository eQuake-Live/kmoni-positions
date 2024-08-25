const options: Intl.DateTimeFormatOptions = {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
}
const formatter = new Intl.DateTimeFormat('en-US', options)

export const getJST = (): Date => new Date(formatter.format(new Date()))
