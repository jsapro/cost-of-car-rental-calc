import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import {
  cars,
  dateIntervalError,
  formattedNowDate,
  zeroDateIntervalMessage,
} from './utils/constants';
import type CarType from './utils/types';

function App() {
  const [daysInterval, setDaysInterval] = useState(0);
  const [startDate, setStartDate] = useState(formattedNowDate);
  const [finishDate, setFinishDate] = useState(formattedNowDate);
  const [errorMessage, setErrorMessage] = useState('');
  const [rentCost, setRentCost] = useState(0);
  const [model, setModel] = useState(cars[0].model);
  const [uniqueAutoClasses, setUniqueAutoClasses] = useState<string[]>(['B']);
  const [filteredByClassCars, setFilteredByClassCars] = useState<CarType[]>(cars);

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
      setErrorMessage(dateIntervalError);
      setRentCost(0);
      return;
    } else {
      setErrorMessage('');

      const [selectedCar] = cars.filter((car) => car.model === model);

      if (daysInterval === 0) {
        setRentCost(0);
        setErrorMessage(zeroDateIntervalMessage);
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
      <section className="calc">
        <h1>Расчет стоимости аренды автомобиля</h1>

        <fieldset className="dropdown-wrapper">
          <label htmlFor="classAuto" className="dropdown-title">
            Класс авто
          </label>
          <select id="classAuto" className="dropdown-menu" onChange={handleSelectClass}>
            {uniqueAutoClasses.map((autoClass) => (
              <option key={autoClass} value={autoClass}>
                {autoClass}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="dropdown-wrapper">
          <label htmlFor="model" className="dropdown-title">
            Модель авто
          </label>
          <select id="model" className="dropdown-menu" onChange={handleSelectModel}>
            {filteredByClassCars.map((car) => (
              <option key={car.model} value={car.model}>
                {car.model}
              </option>
            ))}
          </select>
        </fieldset>

        <form>
          <p className="dropdown-title">Даты аренды</p>
          <input
            className="dropdown-menu"
            type="date"
            value={startDate}
            onChange={handleStartDate}
          ></input>
          -
          <input
            className="dropdown-menu"
            type="date"
            value={finishDate}
            onChange={handleFinishDate}
          ></input>
          <p className="date-error">{errorMessage}</p>
        </form>

        {errorMessage ? null : (
          <p className="result-text">{`стоимость аренды  ${model} c ${startDate
            .split('-')
            .reverse()
            .join('.')} до ${finishDate.split('-').reverse().join('.')} будет равна: ${
            rentCost * daysInterval
          } рублей`}</p>
        )}
      </section>
    </>
  );
}

export default App;
