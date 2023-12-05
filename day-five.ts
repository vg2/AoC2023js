export const runPartOne = (input: string[]): number => {
  const seeds = input[0]
    .split(": ")[1]
    .split(" ")
    .map((x) => parseInt(x));
  const maps: ((from: number) => number | null)[][] = [[]];

  for (let line = 3; line < input.length; line++) {
    if (input[line].includes(":")) {
      maps.push([]);
      continue;
    }

    if (input[line].trim().length === 0) {
      continue;
    }

    const rangeLine = input[line].split(" ").map((x) => parseInt(x));
    const currentMapIndex = maps.length - 1;

    maps[currentMapIndex].push((from) => {
      if (from >= rangeLine[1] && from <= rangeLine[1] + rangeLine[2]) {
        const target = from + (rangeLine[0] - rangeLine[1]);
        return target;
      }
      return null;
    });
  }

  let location = -1;
  for (let seedIndex = 0; seedIndex < seeds.length; seedIndex++) {
    let mapCounter = 0;
    let mappedValue = seeds[seedIndex];

    let nextMapSet = maps[mapCounter];

    while (nextMapSet) {
      let localMappedValue = null;
      for (const map of nextMapSet) {
        localMappedValue = map(mappedValue);
        if (localMappedValue) {
          break;
        }
      }
      mappedValue = localMappedValue ?? mappedValue;
      mapCounter++;
      nextMapSet = maps[mapCounter];
    }

    if (location === -1 || location > mappedValue) {
      location = mappedValue;
    }
  }

  return location;
};

export const runPartTwo = (input: string[]): number => {
  const rawSeeds = input[0]
    .split(": ")[1]
    .split(" ")
    .map((x) => parseInt(x));

  const seedRanges: { from: number; to: number }[] = [];
  for (let i = 0; i < rawSeeds.length; i += 2) {
    seedRanges.push({ from: rawSeeds[i], to: rawSeeds[i + 1] });
  }
  const maps: ((from: number) => number | null)[][] = [[]];

  for (let line = 3; line < input.length; line++) {
    if (input[line].includes(":")) {
      maps.push([]);
      continue;
    }

    if (input[line].trim().length === 0) {
      continue;
    }

    const rangeLine = input[line].split(" ").map((x) => parseInt(x));
    const currentMapIndex = maps.length - 1;

    maps[currentMapIndex].push((to) => {
      if (to >= rangeLine[0] && to <= rangeLine[0] + rangeLine[2]) {
        const target = to + (rangeLine[1] - rangeLine[0]);
        return target;
      }
      return null;
    });
  }

  let locationFound = false;
  let location = 0;
  while (!locationFound) {
    let mapCounter = maps.length - 1;
    let mappedValue = location;
    let nextMapSet = maps[mapCounter];
    while (nextMapSet) {
      let localMappedValue = null;
      for (const map of nextMapSet) {
        localMappedValue = map(mappedValue);
        if (localMappedValue) {
          break;
        }
      }
      mappedValue = localMappedValue ?? mappedValue;

      mapCounter--;
      nextMapSet = maps[mapCounter];
    }
    locationFound = seedRanges.some(sr => sr.from <= mappedValue && (sr.from + sr.to) >= mappedValue);
    if (!locationFound){
      location++;
    }
  }

  return location;
};
