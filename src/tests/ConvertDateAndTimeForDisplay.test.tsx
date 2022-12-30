import { SplitDateAndTime, ConvertDateForDisplay } from "../functions/ConvertDateAndTimeForDisplay";

test('convert "2022-11-14T14:32:46.277239+07:00" to "14:32 14/11/2022"', () => {
    let result = SplitDateAndTime('2022-11-14T14:32:46.277239+07:00');
    expect(result).toBe('14:32 14/11/2022');
})

test('convert "2022-11-14T14:32:46.277239+07:00" to [14, Nov, 2022]', () => {
    let result = ConvertDateForDisplay('2022-11-14T14:32:46.277239+07:00');
    expect(result).toEqual(['14', 'Nov', '2022']);
})
