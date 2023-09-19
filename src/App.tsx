import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { cars, dateIntervalError } from './utils/constants';
import type CarType from './utils/types';

function App() {
  const [daysInterval, setDaysInterval] = useState(0);

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  const [startDate, setStartDate] = useState(formattedDate);
  const [finishDate, setFinishDate] = useState(formattedDate);
  const [error, setError] = useState('');
  const [rentCost, setRentCost] = useState(0);

  const [model, setModel] = useState(cars[0].model);
  const classes = cars.map((car) => {
    return car.class;
  });

  const uniqueAutoClasses = Array.from(new Set(classes));

  const [filteredByClassCars, setFilteredByClassCars] =
    useState<CarType[]>(cars);
  const handleSelectClass = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = e.target.value;
    const filteredCars = cars.filter((car) => car.class === selectedClass);
    setFilteredByClassCars(filteredCars);
    setModel(filteredCars[0].model);
  };

  const handleSelectModel = (e: ChangeEvent<HTMLSelectElement>) => {
    const model = e.target.value;
    setModel(model);
  };

  useEffect(() => {}, []);

  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setStartDate(date);
    // if (date > finishDate) {
    //   setError('Начальная дата должна быть меньше чем конечная');
    // } else {
    //   setError('');
    // }
  };

  const handleFinishDate = (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setFinishDate(date);
    // if (date < startDate) {
    //   setError('Начальная дата должна быть раньше чем конечная');
    // } else {
    //   setError('');
    // }
  };

  useEffect(() => {
    const date1 = new Date(startDate);
    const date2 = new Date(finishDate);

    const interval = date2.getTime() - date1.getTime();
    const daysInterval = Math.floor(interval / (1000 * 3600 * 24));
    setDaysInterval(daysInterval);
    if (daysInterval < 0) {
      setError(dateIntervalError);
      return;
    } else {
      setError('');

      const [selectedCar] = cars.filter((car) => car.model === model);

      if (daysInterval <= 0) {
        setRentCost(0);
        return;
      }
      if (daysInterval === 1) {
        setRentCost(selectedCar.rentCostForDay.shortRent);
        return;
      }
      if (daysInterval <= 5) {
        setRentCost(selectedCar.rentCostForDay.averageRent);
        return;
      }
      if (daysInterval >= 6) {
        setRentCost(selectedCar.rentCostForDay.longRent);
        return;
      }
    }
  }, [startDate, finishDate, model]);

  const handleForm = () => {};

  return (
    <>
      <div>
        <select onChange={handleSelectClass}>
          {uniqueAutoClasses.map((autoClass) => (
            <option key={autoClass} value={autoClass}>
              {autoClass}
            </option>
          ))}
        </select>
        <select onChange={handleSelectModel}>
          {filteredByClassCars.map((car) => (
            <option key={car.model} value={car.model}>
              {car.model}
            </option>
          ))}
        </select>
        <form onChange={handleForm}>
          <input
            type='date'
            value={startDate}
            onChange={handleStartDate}
          ></input>
          -
          <input
            type='date'
            value={finishDate}
            onChange={handleFinishDate}
          ></input>
          <p>{error}</p>
        </form>

        <p>{model}</p>
        <h2>{daysInterval}</h2>
        <h2>{rentCost}</h2>
      </div>
    </>
  );
}

export default App;
