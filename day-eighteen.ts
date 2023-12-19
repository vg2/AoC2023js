export const runPartOne = (input: string[]): number => {
    const instructions = input.map(i => ({dir: i.split(' ')[0], len: parseInt(i.split(' ')[1])}));
    const positions: [number,number][] = [[0,0]];
    let perimeter = 0;
    let currentPos: [number,number] = [0, 0];
    for (let i = 0; i < instructions.length; i++) {
        const currentInstruction = instructions[i];
        let newPos: [number, number] | undefined = undefined;
        switch (currentInstruction.dir) {
            case 'R': newPos = [currentPos[0]+currentInstruction.len, currentPos[1]];
                    break;
            case 'L': newPos = [currentPos[0]-currentInstruction.len, currentPos[1]];
                    break;
            case 'D': newPos = [currentPos[0], currentPos[1]-currentInstruction.len];
                    break;
            case 'U': newPos = [currentPos[0], currentPos[1]+currentInstruction.len];
                    break;
        }
        perimeter += currentInstruction.len;
        positions.push(newPos!);
        currentPos = newPos!;
    }
    positions.push([0,0]);
    const shoelaced = positions.reduce((prev, curr, index) => {
        if (index === positions.length-1) return prev;
        return prev + ((curr[0] * positions[index+1][1]) - (curr[1] * positions[index+1][0]));
    } , 0)
    

    return Math.abs(shoelaced/2) + (perimeter/2) + 1;
};

function hexToDecimal(hex: string): number {
        const map = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
        const hexSplit = hex.split('');
        const len = hexSplit.length;
        return hexSplit.reduce((prev,curr,index) => {
                return prev + (map.indexOf(curr.toUpperCase()) * Math.pow(16,len-index-1));
        } , 0)
}

function codeToDir(code:string): 'R' | 'D' | 'L' | 'U' {
        switch (code) {
                case '0': return 'R';
                case '1': return 'D';
                case '2': return 'L';
                case '3': return 'U';
        }
        throw new Error();
}

function inputToHex(input: string): string {
        return input.substring(input.indexOf("#")+1, input.indexOf(")"));
}

export const runPartTwo = (input: string[]): number => {
        const instructions = input.map(i => ({dir: codeToDir(inputToHex(i)[5]), len: hexToDecimal(inputToHex(i).substring(0,5))}));
        const positions: [number,number][] = [[0,0]];
        let perimeter = 0;
        let currentPos: [number,number] = [0, 0];
        for (let i = 0; i < instructions.length; i++) {
            const currentInstruction = instructions[i];
            let newPos: [number, number] | undefined = undefined;
            switch (currentInstruction.dir) {
                case 'R': newPos = [currentPos[0]+currentInstruction.len, currentPos[1]];
                        break;
                case 'L': newPos = [currentPos[0]-currentInstruction.len, currentPos[1]];
                        break;
                case 'D': newPos = [currentPos[0], currentPos[1]-currentInstruction.len];
                        break;
                case 'U': newPos = [currentPos[0], currentPos[1]+currentInstruction.len];
                        break;
            }
            perimeter += currentInstruction.len;
            positions.push(newPos!);
            currentPos = newPos!;
        }
        positions.push([0,0]);
        const shoelaced = positions.reduce((prev, curr, index) => {
            if (index === positions.length-1) return prev;
            return prev + ((curr[0] * positions[index+1][1]) - (curr[1] * positions[index+1][0]));
        } , 0)
        
    
        return Math.abs(shoelaced/2) + (perimeter/2) + 1;
    };
