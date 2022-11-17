export default function ConvertWeight(value: number, unit: string) {
  let result = value;
  if (unit === 'baht') {
    result *= 15.2;
  } else {
    result *= 5 / 76;
    result.toFixed(3);
  }
  return result;
}
