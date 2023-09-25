interface CarType {
  model: string;
  class: string;
  rentCostForDay: {
    shortRent: number;
    averageRent: number;
    longRent: number;
  };
}

enum daysIntervalEnum {
  zero = 0,
  one = 1,
  five = 5,
  six = 6,
}

export { type CarType, daysIntervalEnum };
