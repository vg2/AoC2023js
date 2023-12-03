export const runPartOne = (input: string[]): number => {
    const maxRed = 12;
    const maxGreen = 13;
    const maxBlue = 14;

    const max = {
        'red': maxRed,
        'green': maxGreen,
        'blue': maxBlue
    }

    let totalIds = 0;
    for (let i = 0; i < input.length; i++) {
        const gameLine = input[i];
        const gameId = parseInt(gameLine.split(':')[0].split(' ')[1]);
        const rounds = gameLine.split(': ')[1].split('; ');
        const passGame = rounds.every(round => round.split(', ').every(x => max[x.split(' ')[1]] >= parseInt(x.split(' ')[0])))

        if (passGame) {
            totalIds += gameId;
        }
    }
    return totalIds;
};

export const runPartTwo = (input: string[]): number => {
    let totalPower = 0;
    for (let i = 0; i < input.length; i++)
    {
        const gameLine = input[i];
        const rounds = gameLine.split(': ')[1].split('; ');
        
        const flatList = rounds.flatMap(round => round.split(', '))
        // console.log(flatList);
        const max = {
            'red': 0,
            'green': 0,
            'blue': 0
        }

        for (let j = 0; j < flatList.length; j++) {
            if (max[flatList[j].split(' ')[1]] < parseInt(flatList[j].split(' ')[0])) {
                max[flatList[j].split(' ')[1]] = parseInt(flatList[j].split(' ')[0]);
            }
        }
        const power = max.red * max.green * max.blue;
        totalPower += power;
    }
    return totalPower;
};
