export const runPartOne = (input: string[]): number => {
    const grids: string[][] = [[]];
    for (let i = 0; i < input.length; i++) {
        if (input[i].trim() === '') {
            grids.push([]); 
            continue;
        }
        grids[grids.length-1].push(input[i]);
    }
    let horizontalAboveReflection = 0;
    let verticalLeftReflection = 0;

    for(let g = 0; g < grids.length; g++) {
        const currentGrid = grids[g];

        let horizontalReflection = false;

        // check for horizontal reflections
        for (let row = 0; row < currentGrid.length - 1; row++) {
            if (currentGrid[row] === currentGrid[row+1]) {
                horizontalReflection = true;
                horizontalAboveReflection += row + 1;
                break;
            }
        }

        if (!horizontalReflection) {
            // check for vertical reflections
            for (let col = 0; col < currentGrid[0].length - 1; col++) {
                let thisCol = currentGrid.map(c => c[col]).join('');
                let nextCol = currentGrid.map(c => c[col+1]).join('');
                if (thisCol === nextCol) {
                    verticalLeftReflection += col + 1;
                    break;
                }
            }
        }
    }

    return verticalLeftReflection + (horizontalAboveReflection * 100);
};

export const runPartTwo = (input: string[]): number => {
    return 0;  
};
