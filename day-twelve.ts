export const runPartOne = (input: string[]): number => {
  let validCombos = 0;

  for (let i = 0; i < input.length; i++) {
    let validCombosForLine = 0;
    const line = input[i];
    const unknownPositions = line
      .split("")
      .map((c, i) => (c === "?" ? i : -1))
      .filter((i) => i !== -1);
    for (let j = 0; j < Math.pow(2, unknownPositions.length); j++) {
      const binaryCombo = decimalToBinaryArray(j, unknownPositions.length);
      const splitLine = line.split(" ");
      const combo = splitLine[0].split("");
      const groups = splitLine[1].split(",").map((x) => parseInt(x));
      for (
        let unknownPosition = 0;
        unknownPosition < unknownPositions.length;
        unknownPosition++
      ) {
        combo[unknownPositions[unknownPosition]] =
          binaryCombo.pop() === 1 ? "." : "#";
      }
      if (isValid(combo.join(""), groups)) {
        validCombosForLine++;
      }
    }
    validCombos += validCombosForLine;
  }

  return validCombos;
};

function decimalToBinaryArray(decimal: number, length: number): number[] {
  // Check if the input is a valid integer
  if (!Number.isInteger(decimal) || decimal < 0) {
    console.error("Input must be a non-negative integer.");
    return [];
  }

  // Special case for 0
  if (decimal === 0) {
    return Array(length).fill(0);
  }

  // Initialize an empty array to store the binary representation
  const binaryArray = [];

  // Convert decimal to binary
  while (decimal > 0) {
    // Use the remainder to get the current binary digit
    binaryArray.unshift(decimal % 2);
    // Update the decimal by dividing it by 2
    decimal = Math.floor(decimal / 2);
  }
  if (binaryArray.length < length) {
    binaryArray.unshift(...Array(length - binaryArray.length).fill(0));
  }
  return binaryArray;
}

function isValid(line: string, groups: number[]): boolean {
  const lineGroups = getGroupsFromLine(line);
  const result =
    lineGroups.length === groups.length &&
    lineGroups.every((x, i) => x === groups[i]);
  return result;
}

function getGroupsFromLine(line: string): number[] {
  return line
    .split(".")
    .filter((x) => x !== "")
    .map((x) => x.length);
}

function unfold(line: string): string {
  const springs = line.split(" ")[0];
  const repeater = Array(5).fill(0);
  const newSprings = repeater.map(() => springs).join("?");
  const conditions = line.split(" ")[1];
  const newConditions = repeater.map(() => conditions).join(",");
  return `${newSprings} ${newConditions}`;
}

export const runPartTwo = (input: string[]): number => {
  let validCombos = 0;

  for (let i = 0; i < input.length; i++) {
    let validCombosForLine = 0;
    const line = unfold(input[i]);
    console.log(line);
    const unknownPositions = line
      .split("")
      .map((c, i) => (c === "?" ? i : -1))
      .filter((i) => i !== -1);
    for (let j = 0; j < Math.pow(2, unknownPositions.length); j++) {
      const binaryCombo = decimalToBinaryArray(j, unknownPositions.length);
      const splitLine = line.split(" ");
      const combo = splitLine[0].split("");
      const groups = splitLine[1].split(",").map((x) => parseInt(x));
      for (
        let unknownPosition = 0;
        unknownPosition < unknownPositions.length;
        unknownPosition++
      ) {
        combo[unknownPositions[unknownPosition]] =
          binaryCombo.pop() === 1 ? "." : "#";
      }
      if (isValid(combo.join(""), groups)) {
        validCombosForLine++;
      }
    }
    console.log(validCombosForLine);
    validCombos += validCombosForLine;
  }

  return validCombos;
};
