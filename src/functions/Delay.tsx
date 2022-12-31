export default function Delay(delay: number) {
  return new Promise((res) => { setTimeout(res, delay); });
}
