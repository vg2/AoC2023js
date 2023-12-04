export const runPartOne = (input: string[]): number => {
  let sum = 0;
  for (let card = 0; card < input.length; card++) {
    const winningNumbers = input[card]
      .split(": ")[1]
      .split(" | ")[0]
      .split(" ")
      .filter((x) => !isNaN(parseInt(x)));
    const yourNumbers = input[card]
      .split(": ")[1]
      .split(" | ")[1]
      .split(" ")
      .filter((x) => !isNaN(parseInt(x)));
    const matchingNumbers = yourNumbers.filter((yn) =>
      winningNumbers.includes(yn)
    );
    if (matchingNumbers.length > 0) {
      sum += Math.pow(2, matchingNumbers.length - 1);
    }
  }
  return sum;
};

export const runPartTwo = (input: string[]): number => {
  const cardsNotPlayed = input.map(() => 1);
  const cardsCounted = input.map(() => 0);

  let cardNotPlayed = cardsNotPlayed.findIndex(c => c > 0);

  while(cardNotPlayed > -1) {
    cardsCounted[cardNotPlayed]++;
    cardsNotPlayed[cardNotPlayed]--;

    const winningNumbers = input[cardNotPlayed]
      .split(": ")[1]
      .split(" | ")[0]
      .split(" ")
      .filter((x) => !isNaN(parseInt(x)));
    const yourNumbers = input[cardNotPlayed]
      .split(": ")[1]
      .split(" | ")[1]
      .split(" ")
      .filter((x) => !isNaN(parseInt(x)));

    const numbersWon = yourNumbers.filter((yn) =>
      winningNumbers.includes(yn)
    ).length;

    for (let i = cardNotPlayed+1; i < Math.min(cardNotPlayed + numbersWon + 1, input.length); i++) {
        cardsNotPlayed[i]++;
    }

    cardNotPlayed = cardsNotPlayed.findIndex(c => c > 0);
  }
//   console.log(cardsCounted);
  return cardsCounted.reduce((acc, cur) => acc + cur, 0);
};
