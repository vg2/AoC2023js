export const runPartOne = (input: string[]): number => {
    const parts = [];
    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        
        let currentNumber = '';
        let currentNumberIsPart = false;
        for (var c = 0; c < line.length; c++) {
            const ch = line[c];
            const number = parseInt(ch);
            const notIsNaN = !isNaN(number)
            if (notIsNaN) {
                currentNumber += ch;
                currentNumberIsPart = currentNumberIsPart || adjacentToSymbol(i,c,input);
            } 
            
            if (currentNumber && (!notIsNaN || c == line.length - 1)) {
                if (currentNumberIsPart) { parts.push(parseInt(currentNumber)); }
                currentNumber = '';
                currentNumberIsPart = false;
            }
        }
    }
    return parts.reduce((acc, cur) => acc + cur, 0);
};

const adjacentToSymbol = (row: number, col: number, input: string[]): boolean => {
    const notSymbols = ['0','1','2','3','4','5','6','7','8','9','.'];
    return (row > 0 && !notSymbols.includes(input[row-1][col]))
        || (row > 0 && col > 0 && !notSymbols.includes(input[row-1][col-1]))
        || (row > 0 && col < input[row-1].length - 1 && !notSymbols.includes(input[row-1][col+1]))
        || (col > 0 && !notSymbols.includes(input[row][col-1]))
        || (col < input[row].length - 1 && !notSymbols.includes(input[row][col+1]))
        || (row < input.length -1 && !notSymbols.includes(input[row+1][col]))
        || (row < input.length -1 && col > 0 && !notSymbols.includes(input[row+1][col-1]))
        || (row < input.length -1 && col < input[row+1].length -1 && !notSymbols.includes(input[row+1][col+1]));
}

export const runPartTwo = (input: string[]): number => {
    const gearRatios = [];
    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        
        let currentStarAdjacentNumbers = [];
        for (var c = 0; c < line.length; c++) {
            const ch = line[c];
            if (ch === '*') {
                currentStarAdjacentNumbers = adjacentNumbers(i,c,input);
            }
            
            if (currentStarAdjacentNumbers.length === 2) {
                gearRatios.push(currentStarAdjacentNumbers[0] * currentStarAdjacentNumbers[1]);
            } 
            currentStarAdjacentNumbers = [];
        }
    }
    return gearRatios.reduce((acc, cur) => acc + cur, 0);    
};

const adjacentNumbers = (row: number, col: number, input: string[]): number[][] {
    const adjNum: number[][] = [];

    if (row === 0) {

    } else if (row === input.length - 1) {

    } else {
        
    }

    return adjNum;
}