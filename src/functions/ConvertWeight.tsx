export function ConvertWeight(value: number, unit: string) {
  let result = value;
  if (unit === 'baht') {
    result *= 15.2;
  } else {
    result *= 5 / 76;
  }
  return Number(result.toFixed(3));
}

export function CheckWeight(weight: number, unit: string) {
  if (unit === 'baht') {
    return ConvertWeight(weight, unit);
  }
  return weight;
}
