export const runPartOne = (input: string[]): number => {
    let total = 0;
    for(let i = 0; i < input.length; i++) {
        const line = input[i];
        const numbers = line.match(/[0-9]/g);
        if (numbers) {
            const lineValue = numbers[0] + numbers[numbers.length - 1];
            total += parseInt(lineValue); 
        }
    }

    return total;
};

export const runPartTwo = (input: string[]): number => {
    const matchValues = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let total = 0;

    for (let i = 0; i < input.length; i++) {
        let firstIndexMatch = 99999999;
        let firstMatch = null;
        let lastIndexMatch = -1;
        let lastMatch = null;
        for (let j = 0; j < matchValues.length; j++) {
            let firstIndex = input[i].indexOf(matchValues[j]);
            if (firstIndex !== -1 && firstIndex < firstIndexMatch) {
                firstIndexMatch = firstIndex;
                if (j < 9) {
                    firstMatch = j + 1;
                } else {
                    firstMatch = j - 8;
                }
            }

            let lastIndex = input[i].lastIndexOf(matchValues[j]);
            if (lastIndex !== -1 && lastIndex > lastIndexMatch) {
                lastIndexMatch = lastIndex;
                if (j < 9) {
                    lastMatch = j + 1;
                } else {
                    lastMatch = j - 8;
                }
            }
        }
        console.log('firstMatch:' + firstMatch);
        console.log('lastMatch:' + lastMatch);
        const lineValue = firstMatch?.toString() + lastMatch?.toString();
        total += parseInt(lineValue);
    }
    return total;
};
