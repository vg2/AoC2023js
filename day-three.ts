export const runPartOne = (input: string[]): number => {
  const parts = [];
  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    let currentNumber = "";
    let currentNumberIsPart = false;
    for (var c = 0; c < line.length; c++) {
      const ch = line[c];
      const number = parseInt(ch);
      const notIsNaN = !isNaN(number);
      if (notIsNaN) {
        currentNumber += ch;
        currentNumberIsPart =
          currentNumberIsPart || adjacentToSymbol(i, c, input);
      }

      if (currentNumber && (!notIsNaN || c == line.length - 1)) {
        if (currentNumberIsPart) {
          parts.push(parseInt(currentNumber));
        }
        currentNumber = "";
        currentNumberIsPart = false;
      }
    }
  }
  return parts.reduce((acc, cur) => acc + cur, 0);
};

const adjacentToSymbol = (
  row: number,
  col: number,
  input: string[]
): boolean => {
  const notSymbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  return (
    (row > 0 && !notSymbols.includes(input[row - 1][col])) ||
    (row > 0 && col > 0 && !notSymbols.includes(input[row - 1][col - 1])) ||
    (row > 0 &&
      col < input[row - 1].length - 1 &&
      !notSymbols.includes(input[row - 1][col + 1])) ||
    (col > 0 && !notSymbols.includes(input[row][col - 1])) ||
    (col < input[row].length - 1 &&
      !notSymbols.includes(input[row][col + 1])) ||
    (row < input.length - 1 && !notSymbols.includes(input[row + 1][col])) ||
    (row < input.length - 1 &&
      col > 0 &&
      !notSymbols.includes(input[row + 1][col - 1])) ||
    (row < input.length - 1 &&
      col < input[row + 1].length - 1 &&
      !notSymbols.includes(input[row + 1][col + 1]))
  );
};

export const runPartTwo = (input: string[]): number => {
  const gearRatios = [];
  const numberPositions: number[][][] = [];

  for (let row = 0; row < input.length; row++) {
    let trackingNumber = false;
    numberPositions.push([]);
    for (var c = 0; c < input[row].length; c++) {
      const ch = input[row][c];
      const num = parseInt(ch);
      if (!isNaN(num)) {
        if (trackingNumber) {
          numberPositions[row][numberPositions[row].length - 1].push(c);
        } else {
          trackingNumber = true;
          numberPositions[row].push([c]);
        }
      } else {
        trackingNumber = false;
      }
    }
  }

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    for (var c = 0; c < line.length; c++) {
      const ch = line[c];
      if (ch === "*") {
        const currentStarAdjacentNumbers = adjacentNumbers(
          i,
          c,
          input,
          numberPositions
        );

        if (currentStarAdjacentNumbers.length === 2) {
          gearRatios.push(
            currentStarAdjacentNumbers[0] * currentStarAdjacentNumbers[1]
          );
        }
      }
    }
  }
  return gearRatios.reduce((acc, cur) => acc + cur, 0);
};

const adjacentNumbers = (
  row: number,
  col: number,
  input: string[],
  numberPositions: number[][][]
): number[] => {
  const adjNum: number[] = [];

  const handleSameRow = (row: number, col: number) => {
    const sameRow = [...numberPositions[row]];
    if (col > 0) {
      const matchingNumber = sameRow.find((r) =>
        r.some((val) => val === col - 1)
      );
      if (matchingNumber) {
        const number = parseInt(
          matchingNumber.map((n) => input[row][n]).join("")
        );
        adjNum.push(number);
        sameRow.splice(sameRow.indexOf(matchingNumber), 1);
      }
    }
    if (col < input[row].length - 1) {
      const matchingNumber = sameRow.find((r) =>
        r.some((val) => val === col + 1)
      );
      if (matchingNumber) {
        const number = parseInt(
          matchingNumber.map((n) => input[row][n]).join("")
        );
        adjNum.push(number);
        sameRow.splice(sameRow.indexOf(matchingNumber), 1);
      }
    }
  };

  const handleNextRow = (row: number, col: number) => {
    const nextrow = [...numberPositions[row + 1]];

    const matchingNumber = nextrow.find((r) => r.some((val) => val === col));
    if (matchingNumber) {
      const number = parseInt(
        matchingNumber.map((n) => input[row + 1][n]).join("")
      );
      adjNum.push(number);

      nextrow.splice(nextrow.indexOf(matchingNumber), 1);
    }

    if (col > 0) {
      const matchingNumber = nextrow.find((r) =>
        r.some((val) => val === col - 1)
      );
      if (matchingNumber) {
        const number = parseInt(
          matchingNumber.map((n) => input[row + 1][n]).join("")
        );
        adjNum.push(number);
        nextrow.splice(nextrow.indexOf(matchingNumber), 1);
      }
    }
    if (col < input[row + 1].length - 1) {
      const matchingNumber = nextrow.find((r) =>
        r.some((val) => val === col + 1)
      );
      if (matchingNumber) {
        const number = parseInt(
          matchingNumber.map((n) => input[row + 1][n]).join("")
        );
        adjNum.push(number);
        nextrow.splice(nextrow.indexOf(matchingNumber), 1);
      }
    }
  };

  const handlePrevRow = (row: number, col: number) => {
    const prevRow = [...numberPositions[row - 1]];
    const matchingNumber = prevRow.find((r) => r.some((val) => val === col));
    if (matchingNumber) {
      const number = parseInt(
        matchingNumber.map((n) => input[row - 1][n]).join("")
      );
      adjNum.push(number);
      prevRow.splice(prevRow.indexOf(matchingNumber), 1);
    }

    if (col > 0) {
      const matchingNumber = prevRow.find((r) =>
        r.some((val) => val === col - 1)
      );
      if (matchingNumber) {
        const number = parseInt(
          matchingNumber.map((n) => input[row - 1][n]).join("")
        );
        adjNum.push(number);
        prevRow.splice(prevRow.indexOf(matchingNumber), 1);
      }
    }
    if (col < input[row - 1].length - 1) {
      const matchingNumber = prevRow.find((r) =>
        r.some((val) => val === col + 1)
      );
      if (matchingNumber) {
        const number = parseInt(
          matchingNumber.map((n) => input[row - 1][n]).join("")
        );
        adjNum.push(number);
        prevRow.splice(prevRow.indexOf(matchingNumber), 1);
      }
    }
  };

  handleSameRow(row, col);
  if (row !== input.length - 1) {
    handleNextRow(row, col);
  }
  if (row !== 0) {
    handlePrevRow(row, col);
  }

  return adjNum;
};
