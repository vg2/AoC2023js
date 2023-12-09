export const runPartOne = (input: string[]): number => {
    let total = 0;
    for(let i = 0; i < input.length; i++) {
        const line = input[i];
        const nums = line.split(' ').map(x => parseInt(x));
        
        total += nums[nums.length - 1];;
        
        let allDiffs = getDiffsInLine(nums);

        while (allDiffs.some(d => d !== 0)) {
            total += allDiffs[allDiffs.length - 1];
            allDiffs = getDiffsInLine(allDiffs);
        }
     
    }
    return total;
};

function getDiffsInLine(nums: number[]) {
    return nums.filter(((_,i) => i !== nums.length-1)).map((val, i) => -1 * (nums[i] - nums[i+1]));
}

export const runPartTwo = (input: string[]): number => {
    let grandtotal = 0;
    for(let i = 0; i < input.length; i++) {
        const line = input[i];
        const nums = line.split(' ').map(x => parseInt(x));
        
        let total = nums[0];
        //console.log(nums);
        let allDiffs = getDiffsInLine(nums);
        let iteration = 0;
        while (allDiffs.some(d => d !== 0)) {
            if (iteration % 2 === 0) {
                total -= allDiffs[0];
            } else {
                total += allDiffs[0];
            }
            //console.log(allDiffs);
            allDiffs = getDiffsInLine(allDiffs);
            iteration++;
        }
        //console.log(total);
        //console.log('--------------')
        grandtotal += total;
     
    }
    return grandtotal;
};

