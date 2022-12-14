import ConvertDateAndTimeForDisplay from "../functions/ConvertDateAndTimeForDisplay";

test('convert "2022-11-14T14:32:46.277239+07:00" to "14:32 14/11/2022"', () => {
    let result = ConvertDateAndTimeForDisplay('2022-11-14T14:32:46.277239+07:00');
    expect(result).toBe('14:32 14/11/2022');
})