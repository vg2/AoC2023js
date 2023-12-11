type CoOrd = [number, number];

type Galaxy = { coord: CoOrd };

export const runPartOne = (input: string[]): number => {
  const myInput = expand(input, 1);
  //   myInput.forEach(l => console.log(l));

  const galaxies: Galaxy[] = [];

  for (let row = 0; row < myInput.length; row++) {
    const currentRow = myInput[row];
    for (let col = 0; col < currentRow.length; col++) {
      if (currentRow[col] === "#") {
        galaxies.push({ coord: [col, row] });
      }
    }
  }
  const galaxyPairs: [Galaxy, Galaxy][] = [];

  for (let gi = 0; gi < galaxies.length; gi++) {
    const currentGalaxy = galaxies[gi];
    for (let pi = gi + 1; pi < galaxies.length; pi++) {
      galaxyPairs.push([galaxies[gi], galaxies[pi]]);
    }
  }

  return galaxyPairs.reduce(
    (curr, prev) => curr + manhattanDistance(prev[0].coord, prev[1].coord),
    0
  );
};

export const runPartTwo = (input: string[]): number => {
  const expanded = getExpanded(input);
  console.log(expanded);
  // const myInput = expand(input, 999999);
  //   myInput.forEach(l => console.log(l));

  const galaxies: Galaxy[] = [];

  for (let row = 0; row < input.length; row++) {
    const currentRow = input[row];
    for (let col = 0; col < currentRow.length; col++) {
      if (currentRow[col] === "#") {
        galaxies.push({ coord: [col, row] });
      }
    }
  }
  const galaxyPairs: [Galaxy, Galaxy][] = [];

  for (let gi = 0; gi < galaxies.length; gi++) {
    for (let pi = gi + 1; pi < galaxies.length; pi++) {
      galaxyPairs.push([galaxies[gi], galaxies[pi]]);
    }
  }

  return galaxyPairs.reduce(
    (curr, prev) => curr + manhattanDistance(prev[0].coord, prev[1].coord) + getExpandCost(prev[0].coord, prev[1].coord, expanded, 1000000),
    0   
  );
};

function getExpandCost(p: CoOrd, q: CoOrd, expanded: { rows: number[]; cols: number[] }, expandFactor: number): number {
    const startRow = p[1] < q[1] ? p[1] : q[1];
    const endRow = p[1] > q[1] ? p[1] : q[1];

    const startCol = p[0] < q[0] ? p[0] : q[0];
    const endCol = p[0] > q[0] ? p[0] : q[0];

    let cost = 0;

    for (let r = startRow; r < endRow; r++) {
        if (expanded.rows.includes(r)) cost++;
    }

    for (let c = startCol; c < endCol; c++) {
        if (expanded.cols.includes(c)) cost++;
    }

    return cost * (expandFactor-1);
}

function getExpanded(input: string[]): { rows: number[]; cols: number[] } {
  let rowsToDup: number[] = [];
  for (let row = 0; row < input.length; row++) {
    const currentRow = input[row];
    if (currentRow.split("").every((s) => s === ".")) {
      rowsToDup.push(row);
    }
  }

  let colsToDup: number[] = [];
  for (let col = 0; col < input[0].length; col++) {
    if (input.every((line) => line[col] === ".")) {
      colsToDup.push(col);
    }
  }

  return { rows: rowsToDup, cols: colsToDup };
}

function expand(input: string[], expandBy: number): string[] {
  const myInput = [...input];

  let rowsToDup: number[] = [];
  for (let row = 0; row < myInput.length; row++) {
    const currentRow = myInput[row];
    if (currentRow.split("").every((s) => s === ".")) {
      for (let c = 0; c < expandBy; c++) {
        rowsToDup.push(row);
      }
    }
  }
  const blankRow = myInput[0]
    .split("")
    .map((_) => ".")
    .join("");
  rowsToDup.forEach((r, i) => myInput.splice(r + i, 0, blankRow));

  let colsToDup: number[] = [];
  for (let col = 0; col < myInput[0].length; col++) {
    if (myInput.every((line) => line[col] === ".")) {
      for (let c = 0; c < expandBy; c++) {
        colsToDup.push(col);
      }
    }
  }

  const newInput = myInput.map((line) => {
    const currentLine = line.split("");
    colsToDup.forEach((col, i) => {
      currentLine.splice(col + i, 0, ".");
    });
    return currentLine.join("");
  });

  return newInput;
}

function uniquePairs(items: any[]): number {
  const itemCount = items.length;
  return (itemCount * (itemCount - 1)) / 2;
}

function manhattanDistance(p: CoOrd, q: CoOrd): number {
  return Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]);
}
