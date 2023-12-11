type Pos = [x: number, y: number];

function posEquals(pos1: Pos, pos2: Pos): boolean {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

function validEast(currentPipe: string, eastPipe: string): boolean {
    return ['S','-','F','L'].includes(currentPipe) && ['S', '-','7','J'].includes(eastPipe);
}

function validWest(currentPipe: string, eastPipe: string): boolean {
    return ['S','-','J','7'].includes(currentPipe) && ['S', '-','F','L'].includes(eastPipe);
}

function validNorth(currentPipe: string, eastPipe: string): boolean {
    return ['S','|','L','J'].includes(currentPipe) && ['S', '|','F','7'].includes(eastPipe);
}

function validSouth(currentPipe: string, eastPipe: string): boolean {
    return ['S','|','7','F'].includes(currentPipe) && ['S', 'L','J','|'].includes(eastPipe);
}

export const runPartOne = (input: string[]): number => {
    const lineIndexContainingStart = input.findIndex(x => x.includes("S"));
    const sPos: Pos = [input[lineIndexContainingStart].indexOf("S"), lineIndexContainingStart];
    let count = 0;
    let currentPipe = input[sPos[1]][sPos[0]];
    let currentPos: Pos = sPos;
    let previousPos: Pos | undefined = undefined;

    while ((count === 0 || currentPipe !== 'S')) {
        const eastPos: Pos = [currentPos[0] + 1, currentPos[1]];
        if (!previousPos || !posEquals(previousPos, eastPos)) {
            const eastPipe = input[eastPos[1]]?.[eastPos[0]];
            if (validEast(currentPipe, eastPipe)) {
                //console.log('Moving East');
                count++;
                previousPos = currentPos;
                currentPos = eastPos;
                currentPipe = input[currentPos[1]][currentPos[0]];
            }
        }

        const northPos: Pos = [currentPos[0], currentPos[1] - 1];
        if (!previousPos || !posEquals(previousPos, northPos)) {
            const northPipe = input[northPos[1]]?.[northPos[0]];
            if (validNorth(currentPipe, northPipe)) {
                //console.log('Moving North');
                count++;
                previousPos = currentPos;
                currentPos = northPos;
                currentPipe = input[currentPos[1]][currentPos[0]];
            }
        }

        const westPos: Pos = [currentPos[0] - 1, currentPos[1]];
        if (!previousPos || !posEquals(previousPos, westPos)) {
            const westPipe = input[westPos[1]]?.[westPos[0]];
            if (validWest(currentPipe, westPipe)) {
                //console.log('Moving West');
                count++;
                previousPos = currentPos;
                currentPos = westPos;
                currentPipe = input[currentPos[1]][currentPos[0]];
            }
        }

        const southPos: Pos = [currentPos[0], currentPos[1] + 1];
        if (!previousPos || !posEquals(previousPos, southPos)) {
            const southPipe = input[southPos[1]]?.[southPos[0]];
            if (validSouth(currentPipe, southPipe)) {
                //console.log('Moving South');
                count++;
                previousPos = currentPos;
                currentPos = southPos;
                currentPipe = input[currentPos[1]][currentPos[0]];
            }
        }
    }

    return count / 2;
};

type PathItem = { pos: Pos, symbol: string };

export const runPartTwo = (input: string[]): number => {
    const lineIndexContainingStart = input.findIndex(x => x.includes("S"));
    const sPos: Pos = [input[lineIndexContainingStart].indexOf("S"), lineIndexContainingStart];
    let count = 0;
    let currentPipe = input[sPos[1]][sPos[0]];
    let currentPos: Pos = sPos;
    let previousPos: Pos | undefined = undefined;
    let path: PathItem[] = [{pos: sPos, symbol: currentPipe }];

    while ((count === 0 || currentPipe !== 'S')) {
        const eastPos: Pos = [currentPos[0] + 1, currentPos[1]];
        if (!previousPos || !posEquals(previousPos, eastPos)) {
            const eastPipe = input[eastPos[1]]?.[eastPos[0]];
            if (validEast(currentPipe, eastPipe)) {
                count++;
                previousPos = currentPos;
                currentPos = eastPos;
                currentPipe = input[currentPos[1]][currentPos[0]];
                path.push({pos: currentPos, symbol: currentPipe });
            }
        }

        const northPos: Pos = [currentPos[0], currentPos[1] - 1];
        if (!previousPos || !posEquals(previousPos, northPos)) {
            const northPipe = input[northPos[1]]?.[northPos[0]];
            if (validNorth(currentPipe, northPipe)) {
                count++;
                previousPos = currentPos;
                currentPos = northPos;
                currentPipe = input[currentPos[1]][currentPos[0]];
                path.push({pos: currentPos, symbol: currentPipe });
            }
        }

        const westPos: Pos = [currentPos[0] - 1, currentPos[1]];
        if (!previousPos || !posEquals(previousPos, westPos)) {
            const westPipe = input[westPos[1]]?.[westPos[0]];
            if (validWest(currentPipe, westPipe)) {
                count++;
                previousPos = currentPos;
                currentPos = westPos;
                currentPipe = input[currentPos[1]][currentPos[0]];
                path.push({pos: currentPos, symbol: currentPipe });
            }
        }

        const southPos: Pos = [currentPos[0], currentPos[1] + 1];
        if (!previousPos || !posEquals(previousPos, southPos)) {
            const southPipe = input[southPos[1]]?.[southPos[0]];
            if (validSouth(currentPipe, southPipe)) {
                count++;
                previousPos = currentPos;
                currentPos = southPos;
                currentPipe = input[currentPos[1]][currentPos[0]];
                path.push({pos: currentPos, symbol: currentPipe });
            }
        }
    }

    let insideLoop = 0;
    for(let row = 1; row < input.length - 1; row++) {
        const currentRow = input[row];
        for (let col = 1; col < currentRow.length - 1; col++) {
            if (path.find(p => p.pos[1] === row && p.pos[0] === col)) continue;

            // check west
            const westChecks = ['|', 'L', 'J'];
            const pathWest = path.filter(p => p.pos[1] === row && p.pos[0] < col);
            const westCounter = pathWest.filter(x => westChecks.includes(x.symbol)).length;
            if (westCounter % 2 === 0) continue;

            // check east
            const eastChecks = ['|', 'L', 'J'];
            const pathEast = path.filter(p => p.pos[1] === row && p.pos[0] > col);
            const eastCounter = pathEast.filter(x => eastChecks.includes(x.symbol)).length;
            if (eastCounter % 2 === 0) continue;

            // check north
            const northChecks = ['-', 'L', 'F'];
            const pathNorth = path.filter(p => p.pos[1] < row && p.pos[0] === col);
            const northCounter = pathNorth.filter(x => northChecks.includes(x.symbol)).length;
            if (northCounter % 2 === 0) continue;

            // check south
            const southChecks = ['-', 'L', 'F'];
            const pathSouth = path.filter(p => p.pos[1] > row && p.pos[0] === col);
            const southCounter = pathSouth.filter(x => southChecks.includes(x.symbol)).length;
            if (southCounter % 2 === 0) continue;

            insideLoop++;
        }
    }

    return insideLoop;
};
