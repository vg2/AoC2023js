export const runPartOne = (input: string[]): number => {
  const handsAndBids: [string, number, number | undefined][] = input.map(
    (line) => [line.split(" ")[0], parseInt(line.split(" ")[1]), undefined]
  );

  const cardStrengthsOrdered = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];
  const handTypeChecksOrdered: ((cardDictionary: {
    [key: string]: number;
  }) => number | undefined)[] = [
    isFiveOfAKind,
    isFourOfAKind,
    isFullHouse,
    isThreeOfAKind,
    isTwoPair,
    isOnePair,
    isHighCard,
  ];

  for (let i = 0; i < handsAndBids.length; i++) {
    const [hand, _, __] = handsAndBids[i];
    const cardDictionary = buildCardCountDictionary(hand);
    let handScore = undefined;
    let currentCheck = 0;
    let check = handTypeChecksOrdered[currentCheck];
    while (!handScore && !!check) {
      handScore = check(cardDictionary);
      if (!handScore) {
        currentCheck++;
        check = handTypeChecksOrdered[currentCheck];
      }
    }
    handsAndBids[i][2] = handScore;
  }

  handsAndBids.sort((hand1, hand2) => {
    const [_, __, hand1CardScore] = hand1;
    const [___, _____, hand2CardScore] = hand2;

    const result = (hand2CardScore ?? 0) - (hand1CardScore ?? 0);

    if (result === 0) {
      if (hand1BeatsHand2(hand1[0], hand2[0], cardStrengthsOrdered)) {
        return -1;
      }
      return 1;
    }

    return result;
  });

  const maxRank = handsAndBids.length;
  return handsAndBids
    .map((hab) => hab[1])
    .reduce((prev, curr, index) => prev + curr * (maxRank - index), 0);
};

function isFiveOfAKind(cardDictionary: {
  [key: string]: number;
}): number | undefined {
  if (Object.keys(cardDictionary).length === 1) {
    return 7;
  }
}

function isFourOfAKind(cardDictionary: {
  [key: string]: number;
}): number | undefined {
  if (Object.keys(cardDictionary).some((c) => cardDictionary[c] === 4)) {
    return 6;
  }
}

function isFullHouse(cardDictionary: {
  [key: string]: number;
}): number | undefined {
  const keys = Object.keys(cardDictionary);
  if (
    keys.some((k) => cardDictionary[k] === 3) &&
    keys.some((k) => cardDictionary[k] === 2)
  ) {
    return 5;
  }
}

function isThreeOfAKind(cardDictionary: {
  [key: string]: number;
}): number | undefined {
  const keys = Object.keys(cardDictionary);
  if (keys.some((k) => cardDictionary[k] === 3) && keys.length > 2) {
    return 4;
  }
}

function isTwoPair(cardDictionary: {
  [key: string]: number;
}): number | undefined {
  const keys = Object.keys(cardDictionary);
  if (keys.filter((k) => cardDictionary[k] === 2).length === 2) {
    return 3;
  }
}

function isOnePair(cardDictionary: {
  [key: string]: number;
}): number | undefined {
  const keys = Object.keys(cardDictionary);
  if (
    keys.filter((k) => cardDictionary[k] === 2).length === 1 &&
    keys.length === 4
  ) {
    return 2;
  }
}

function isHighCard(cardDictionary: {
  [key: string]: number;
}): number | undefined {
  const keys = Object.keys(cardDictionary);
  if (keys.length === 5) {
    return 1;
  }
}

function hand1BeatsHand2(
  hand1: string,
  hand2: string,
  cardStrengthOrders: string[]
): boolean {
  const hand1Cards = hand1.split("");
  const hand2Cards = hand2.split("");
  for (let i = 0; i < hand1Cards.length; i++) {
    const hand1CardScore = cardStrengthOrders.indexOf(hand1Cards[i]);
    const hand2CardScore = cardStrengthOrders.indexOf(hand2Cards[i]);

    if (hand1CardScore === hand2CardScore) continue;

    return hand1CardScore < hand2CardScore;
  }

  return false;
}

function buildCardCountDictionary(hand: string): { [key: string]: number } {
  const cards = hand.split("");
  const cardDictionary: { [key: string]: number } = {};
  for (const card of cards) {
    cardDictionary[card] = (cardDictionary[card] ?? 0) + 1;
  }
  return cardDictionary;
}

function buildCardCountDictionaryWithJokerBoost(hand: string): {
  [key: string]: number;
} {
  const cards = hand.split("");
  const cardDictionary: { [key: string]: number } = {};
  for (const card of cards) {
    cardDictionary[card] = (cardDictionary[card] ?? 0) + 1;
  }

  if (hand.includes("J") && Object.keys(cardDictionary).length > 1) {
    const jokerCount = cardDictionary['J'];
    const highestCardExclJoker = Object.keys(cardDictionary)
      .filter((key) => key !== "J")
      .map<[string,number]>((key) => [key, cardDictionary[key]])
      .sort((pair1, pair2) => pair2[1] - pair1[1])
      [0][0];
    
    cardDictionary[highestCardExclJoker] += jokerCount;
    delete cardDictionary['J'];
  }
  return cardDictionary;
}

export const runPartTwo = (input: string[]): number => {
  const handsAndBids: [string, number, number | undefined][] = input.map(
    (line) => [line.split(" ")[0], parseInt(line.split(" ")[1]), undefined]
  );

  const cardStrengthsOrdered = [
    "A",
    "K",
    "Q",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "J",
  ];
  const handTypeChecksOrdered: ((cardDictionary: {
    [key: string]: number;
  }) => number | undefined)[] = [
    isFiveOfAKind,
    isFourOfAKind,
    isFullHouse,
    isThreeOfAKind,
    isTwoPair,
    isOnePair,
    isHighCard,
  ];

  for (let i = 0; i < handsAndBids.length; i++) {
    const [hand, _, __] = handsAndBids[i];
    const cardDictionary = buildCardCountDictionaryWithJokerBoost(hand);
    let handScore = undefined;
    let currentCheck = 0;
    let check = handTypeChecksOrdered[currentCheck];
    while (!handScore && !!check) {
      handScore = check(cardDictionary);
      if (!handScore) {
        currentCheck++;
        check = handTypeChecksOrdered[currentCheck];
      }
    }
    handsAndBids[i][2] = handScore;
  }

  handsAndBids.sort((hand1, hand2) => {
    const [_, __, hand1CardScore] = hand1;
    const [___, _____, hand2CardScore] = hand2;

    const result = (hand2CardScore ?? 0) - (hand1CardScore ?? 0);

    if (result === 0) {
      if (hand1BeatsHand2(hand1[0], hand2[0], cardStrengthsOrdered)) {
        return -1;
      }
      return 1;
    }

    return result;
  });

  const maxRank = handsAndBids.length;
  return handsAndBids
    .map((hab) => hab[1])
    .reduce((prev, curr, index) => prev + curr * (maxRank - index), 0);
};
