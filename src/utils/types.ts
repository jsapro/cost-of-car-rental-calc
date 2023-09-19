interface CarType {
  model: string;
  class: string;
  rentCostForDay: {
    shortRent: number;
    averageRent: number;
    longRent: number;
  };
}

export default CarType;
