export const runPartOne = (input: string[]): number => {
  const raceLengths = input[0]
    .split(":")[1]
    .split(" ")
    .filter((x) => !!x)
    .map((x) => parseInt(x));
  const distances = input[1]
    .split(":")[1]
    .split(" ")
    .filter((x) => !!x)
    .map((x) => parseInt(x));

  const waysToWinEachRace: number[] = raceLengths.map((x) => 0);
  for (let race = 0; race < raceLengths.length; race++) {
    const currentRaceLength = raceLengths[race];
    for (
      let timeToHoldButton = 1;
      timeToHoldButton < currentRaceLength - 1;
      timeToHoldButton++
    ) {
      const mmTravelled =
        timeToHoldButton * (currentRaceLength - timeToHoldButton);
      if (mmTravelled > distances[race]) {
        waysToWinEachRace[race]++;
      }
    }
  }

  return waysToWinEachRace.reduce((cur, acc) => cur * acc, 1);
};

export const runPartTwo = (input: string[]): number => {
  const raceLength = parseInt(
    input[0]
      .split(":")[1]
      .split(" ")
      .filter((x) => !!x)
      .join("")
  );
  const distance = parseInt(
    input[1]
      .split(":")[1]
      .split(" ")
      .filter((x) => !!x)
      .join("")
  );

  let waysToWinRace = 0;
  for (
    let timeToHoldButton = 1;
    timeToHoldButton < raceLength - 1;
    timeToHoldButton++
  ) {
    const mmTravelled =
      timeToHoldButton * (raceLength - timeToHoldButton);
    if (mmTravelled > distance) {
        waysToWinRace++;
    }
  }

  return waysToWinRace;
};
