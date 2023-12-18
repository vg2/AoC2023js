import { readFileSync } from "fs";

const day = 'day-thirteen';

const dayModule = await import(`./${day}`);
const runPartOne: (allLines: string[]) => number = dayModule.runPartOne;
const runPartTwo: (allLines: string[]) => number = dayModule.runPartTwo;


const contents = readFileSync(`${day}-input.txt`, 'utf-8');
const allLines = contents.split('\n');

console.log(runPartOne(allLines));

console.log(runPartTwo(allLines));
