export const runPartOne = (input: string[]): number => {
    const grids: string[][] = [[]];
    for (let i = 0; i < input.length; i++) {
        if (!input[i] || input[i].trim() === '') {
            grids.push([]);
            continue;
        }
        grids[grids.length - 1].push(input[i]);
    }
    let horizontalAboveReflection = 0;
    let verticalLeftReflection = 0;
// console.log(`Grids: ${grids.length}`);
    for (let g = 0; g < grids.length; g++) {
        const currentGrid = grids[g];
        // console.log(`CurrentGrid: ${g}`);
        let checkVertical = true;

        // check for horizontal reflections
        for (let row = 0; row < currentGrid.length - 1; row++) {
            if (currentGrid[row] === currentGrid[row + 1]) {
                let horizontalReflection = true;
                let start = row - 1;
                let end = row + 2;
                while (start >= 0 && end < currentGrid.length) {
                    if (currentGrid[start] === currentGrid[end]) {
                        start--;
                        end++;
                    } else {
                        horizontalReflection = false;
                        break;
                    }
                }
                if (horizontalReflection) {
                    checkVertical = false;
                    // console.log(`Horizontal Reflection @ Row=${row}`);
                    horizontalAboveReflection += row + 1;
                    break;
                }
            }
        }

        if (checkVertical) {
            // check for vertical reflections
            for (let col = 0; col < currentGrid[0].length - 1; col++) {

                let thisCol = currentGrid.map(c => c[col]).join('');
                let nextCol = currentGrid.map(c => c[col + 1]).join('');

                // console.log(`Column=${col}`);
                // console.log(`thisCol=${thisCol}`);
                // console.log(`nextCol=${nextCol}`);
                if (thisCol === nextCol) {
                    let verticalReflection = true;
                    let start = col - 1;
                    let end = col + 2;
                    while (start >= 0 && end < currentGrid[0].length) {
                        if (currentGrid.map(c => c[start]).join('') === currentGrid.map(c => c[end]).join('')) {
                            start--;
                            end++;
                        } else {
                            verticalReflection = false;
                            break;
                        }
                    }
                    if (verticalReflection) {
                        // console.log(`Vertical Reflection @ Col=${col}`);
                        verticalLeftReflection += col + 1;
                        break;
                    }
                }
            }

        }
    }

    //console.log(verticalLeftReflection);
    //console.log(horizontalAboveReflection);
    return verticalLeftReflection + (horizontalAboveReflection * 100);
};

export const runPartTwo = (input: string[]): number => {
    const grids: string[][] = [[]];
    for (let i = 0; i < input.length; i++) {
        if (!input[i] || input[i].trim() === '') {
            grids.push([]);
            continue;
        }
        grids[grids.length - 1].push(input[i]);
    }
    let horizontalAboveReflection = 0;
    let verticalLeftReflection = 0;
// console.log(`Grids: ${grids.length}`);
    for (let g = 0; g < grids.length; g++) {
        const currentGrid = grids[g];
        // console.log(`CurrentGrid: ${g}`);
        let checkVertical = true;

        // check for horizontal reflections
        for (let row = 0; row < currentGrid.length - 1; row++) {
            let diffs = countDiffs(currentGrid[row], currentGrid[row+1]);
            // console.log(`horizontal diffs at row=${row} | ${diffs}`)
            if (diffs <= 1) {
                let horizontalReflection = true;
                let start = row - 1;
                let end = row + 2;
                while (start >= 0 && end < currentGrid.length) {
                    diffs += countDiffs(currentGrid[start], currentGrid[end]);
                    if (diffs <= 1) {
                        start--;
                        end++;
                    } else {
                        horizontalReflection = false;
                        break;
                    }
                }
                if (horizontalReflection && diffs === 1) {
                    checkVertical = false;
                    // console.log(`Horizontal Reflection @ Row=${row}`);
                    horizontalAboveReflection += row + 1;
                    break;
                }
            }
        }

        if (checkVertical) {
            // check for vertical reflections
            for (let col = 0; col < currentGrid[0].length - 1; col++) {

                let thisCol = currentGrid.map(c => c[col]).join('');
                let nextCol = currentGrid.map(c => c[col + 1]).join('');
                let diffs = countDiffs(thisCol, nextCol);
                // console.log(`Column=${col}`);
                // console.log(`thisCol=${thisCol}`);
                // console.log(`nextCol=${nextCol}`);
                if (diffs <= 1) {
                    let verticalReflection = true;
                    let start = col - 1;
                    let end = col + 2;
                    while (start >= 0 && end < currentGrid[0].length) {
                        diffs += countDiffs(currentGrid.map(c => c[start]).join(''), currentGrid.map(c => c[end]).join(''));
                        if (diffs <= 1) {
                            start--;
                            end++;
                        } else {
                            verticalReflection = false;
                            break;
                        }
                    }
                    if (verticalReflection && diffs === 1) {
                        // console.log(`Vertical Reflection @ Col=${col}`);
                        verticalLeftReflection += col + 1;
                        break;
                    }
                }
            }

        }
    }

    //console.log(verticalLeftReflection);
    //console.log(horizontalAboveReflection);
    return verticalLeftReflection + (horizontalAboveReflection * 100);
};


function countDiffs(string1: string, string2: string): number {
    // console.log(string1 +" = " + string2);
    const string1Split = string1.split('');
    const string2Split = string2.split('');
    return string1Split.reduce<number>((prev, curr, index) => prev += (curr !== string2Split[index] ? 1 : 0), 0);
}