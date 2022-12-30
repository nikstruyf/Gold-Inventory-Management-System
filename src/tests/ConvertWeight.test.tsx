import { ConvertWeight } from "../functions/ConvertWeight";

test('convert weight 0.125 baht to 1.9 gram', () => {
    let result = ConvertWeight(0.125, 'baht');
    expect(result).toEqual(1.9);
})

test('convert weight 1.9 gram to 0.125 baht', () => {
    let result = ConvertWeight(1.9, 'gram');
    expect(result).toEqual(0.125);
})
