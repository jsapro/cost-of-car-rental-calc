const cars = [
    {
      model: 'BMW X5',
      class: 'B',
      rentCostForDay: {
        shortRent: 10000,
        averageRent: 8000,
        longRent: 5000,
      },
    },
    {
      model: 'Nissan Quashkai',
      class: 'B',
      rentCostForDay: {
        shortRent: 9000,
        averageRent: 7000,
        longRent: 4500,
      },
    },
    {
      model: 'Ford Focus',
      class: 'B',
      rentCostForDay: {
        shortRent: 8000,
        averageRent: 6500,
        longRent: 4000,
      },
    },
    {
      model: 'Ford Transit',
      class: 'C',
      rentCostForDay: {
        shortRent: 12000,
        averageRent: 10000,
        longRent: 8000,
      },
    },
    {
      model: 'Mercedes-Benz Sprinter',
      class: 'C',
      rentCostForDay: {
        shortRent: 13000,
        averageRent: 11000,
        longRent: 9000,
      },
    },
];

const dateIntervalError = 'Начальная дата должна быть раньше чем конечная';
const zeroDateIntervalMessage = 'Аренда рассчитывается от 1 суток. Выберите подходящие даты';

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedNowDate = `${year}-${month}-${day}`;

export {cars, dateIntervalError, formattedNowDate, zeroDateIntervalMessage}
  
