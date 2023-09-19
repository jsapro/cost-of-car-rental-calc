import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { cars, dateIntervalError, formattedNowDate } from './utils/constants';
import type CarType from './utils/types';

function App() {
  const [daysInterval, setDaysInterval] = useState(0);
  const [startDate, setStartDate] = useState(formattedNowDate);
  const [finishDate, setFinishDate] = useState(formattedNowDate);
  const [error, setError] = useState('');
  const [rentCost, setRentCost] = useState(0);
  const [model, setModel] = useState(cars[0].model);
  const [uniqueAutoClasses, setUniqueAutoClasses] = useState<string[]>([
    'B',
    'C',
  ]);

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

  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setStartDate(date);
  };

  const handleFinishDate = (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setFinishDate(date);
  };

  useEffect(() => {
    const classes = cars.map((car) => {
      return car.class;
    });
    setUniqueAutoClasses(Array.from(new Set(classes)));
  }, []);

  useEffect(() => {
    const date1 = new Date(startDate);
    const date2 = new Date(finishDate);

    const interval = date2.getTime() - date1.getTime();
    const daysInterval = Math.floor(interval / (1000 * 3600 * 24));
    setDaysInterval(daysInterval);
    if (daysInterval < 0) {
      setError(dateIntervalError);
      setRentCost(0)
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
        <form>
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
