import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './App.css';
import {
  cars,
  dateIntervalError,
  formattedNowDate,
  zeroDateIntervalMessage,
} from './utils/constants';
import { type CarType, daysIntervalEnum } from './utils/types';

function App() {
  const [daysInterval, setDaysInterval] = useState(0);
  const [startDate, setStartDate] = useState(formattedNowDate);
  const [finishDate, setFinishDate] = useState(formattedNowDate);
  const [errorMessage, setErrorMessage] = useState('');
  const [rentCost, setRentCost] = useState(0);
  const [model, setModel] = useState(cars[0].model);
  const [uniqueAutoClasses, setUniqueAutoClasses] = useState(['B']);
  const [filteredByClassCars, setFilteredByClassCars] = useState<CarType[]>(cars);

  const handleSelectClass = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = e.target.value;
    const filteredCars = cars.filter((car) => car.class === selectedClass);
    // const filteredCars = cars.filter(({ class }) => class === selectedClass);
    setFilteredByClassCars(filteredCars);
    setModel(filteredCars[0].model);
  };

  const handleSelectModel = (e: ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
  };

  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleFinishDate = (e: ChangeEvent<HTMLInputElement>) => {
    setFinishDate(e.target.value);
  };

  useEffect(() => {
    const classes = cars.map((car) => {
      return car.class;
    });
    // const classes = cars.map(({class}) => class);
    setUniqueAutoClasses(Array.from(new Set(classes)));
  }, []);

  const findInterval = useCallback(() => {
    const _startDate = new Date(startDate);
    const _finishDate = new Date(finishDate);

    const interval = _finishDate.getTime() - _startDate.getTime();
    const daysInterval = Math.floor(interval / (1000 * 3600 * 24));
    return daysInterval;
  }, [finishDate, startDate]);

  useEffect(() => {
    const daysInterval = findInterval();
    setDaysInterval(daysInterval);
    if (daysInterval < 0) {
      setErrorMessage(dateIntervalError);
      setRentCost(0);
      return;
    } else {
      setErrorMessage('');

      const [selectedCar] = cars.filter((car) => car.model === model);

      if (daysInterval === daysIntervalEnum.zero) {
        setRentCost(0);
        setErrorMessage(zeroDateIntervalMessage);
        return;
      }
      if (daysInterval === daysIntervalEnum.one) {
        setRentCost(selectedCar.rentCostForDay.shortRent);
        return;
      }
      if (daysInterval <= daysIntervalEnum.five) {
        setRentCost(selectedCar.rentCostForDay.averageRent);
        return;
      }
      if (daysInterval >= daysIntervalEnum.six) {
        setRentCost(selectedCar.rentCostForDay.longRent);
        return;
      }
    }
  }, [model, findInterval]);

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
