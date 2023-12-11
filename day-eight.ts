export const runPartOne = (input: string[]): number => {
  //   const instructions = input[0].split("");
  //   const map: { [key: string]: [l: string, r: string] } = {};
  //   for (let i = 2; i < input.length; i++) {
  //     const line = input[i];
  //     const key = line.split(" = ")[0];
  //     const val = line
  //       .split(" = ")[1]
  //       .replace("(", "")
  //       .replace(")", "")
  //       .split(", ");
  //     map[key] = [val[0], val[1]];
  //   }
  //   const start = "AAA";
  //   const end = "ZZZ";
  //   let current = start;
  //   let instructionCount = 0;
  //   let insLength = instructions.length;
  //   let steps = 0;
  //   while (current !== end) {
  //     const instruction = instructions[instructionCount % insLength];
  //     steps++;
  //     const index = instruction === "R" ? 1 : 0;
  //     current = map[current][index];
  //     instructionCount++;
  //   }
  //   return steps;
};

export const runPartTwo = (input: string[]): number => {
  const instructions = input[0].split("");
  const map: { [key: string]: [l: string, r: string] } = {};
  for (let i = 2; i < input.length; i++) {
    const line = input[i];
    const key = line.split(" = ")[0];
    const val = line
      .split(" = ")[1]
      .replace("(", "")
      .replace(")", "")
      .split(", ");
    map[key] = [val[0], val[1]];
  }

  const startingEnd = "A";
  const endingEnd = "Z";

  let insLength = instructions.length;
  let currentNodes: string[] = Object.keys(map).filter((k) =>
    k.endsWith(startingEnd)
  );
  let stepsPerNode = currentNodes.map(() => 0);

  for (let n = 0; n < currentNodes.length; n++) {
    let current = currentNodes[n];
    let steps = 0;
    let instructionCount = 0;

    while (!current.endsWith(endingEnd)) {
      const instruction = instructions[instructionCount % insLength];
      steps++;
      const index = instruction === "R" ? 1 : 0;
      current = map[current][index];
      instructionCount++;
    }
    stepsPerNode[n] = steps;
  }

  let min = stepsPerNode.sort((a, b) => a - b)[0];

  stepsPerNode.forEach(function (n) {
    min = lcm(min, n);
  });

  //   while (currentNodes.some(x => !x.endsWith(endingEnd))) {
  //     console.log(`step: ${steps} | ${currentNodes}`);
  //     const instruction = instructions[instructionCount % insLength];
  //     steps++;
  //     const index = instruction === "R" ? 1 : 0;
  //     currentNodes = currentNodes.map(n => map[n][index]);
  //     instructionCount++;
  //   }

  return min;
};

function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
