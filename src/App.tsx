import { useEffect, useState } from 'react';
import './App.css';

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

  type CarType = {
    model: string;
    class: string;
    rentCostForDay: {
      shortRent: number;
      averageRent: number;
      longRent: number;
    };
  };
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

  const [model, setModel] = useState(cars[0].model);
  const classes = cars.map((car) => {
    return car.class;
  });

  const uniqueClasses = Array.from(new Set(classes));

  const [filteredByClassCars, setFilteredByClassCars] =
    useState<CarType[]>(cars);
  const handleSelectClass = (e) => {
    const selectedClass = e.target.value;
    const filteredCars = cars.filter((car) => car.class === selectedClass);
    setFilteredByClassCars(filteredCars);
    setModel(filteredCars[0].model);
  };

  const handleSelectModel = (e) => {
    const model = e.target.value;
    setModel(model);
  };

  useEffect(() => {}, []);

  const handleStartDate = (e) => {
    const date = e.target.value;
    setStartDate(date);
    // if (date > finishDate) {
    //   setError('Начальная дата должна быть меньше чем конечная');
    // } else {
    //   setError('');
    // }
  };

  const handleFinishDate = (e) => {
    const date = e.target.value;
    setFinishDate(date);
    // if (date < startDate) {
    //   setError('Начальная дата должна быть раньше чем конечная');
    // } else {
    //   setError('');
    // }
  };

  useEffect(() => {
    console.log('useEffect++++');
    const date1 = new Date(startDate);
    const date2 = new Date(finishDate);

    const interval = date2.getTime() - date1.getTime();
    const daysInterval = Math.floor(interval / (1000 * 3600 * 24));
    setDaysInterval(daysInterval);
    console.log('Interval in days+++', daysInterval);
    if (daysInterval < 0) {
      setError('Начальная дата должна быть раньше чем конечная');
      return
    } else {
      setError('');
      
      const [selectedCar] = cars.filter((car) => car.model === model);
      
      if (daysInterval <= 0) {
        setRentCost(0);
        console.log('<= 0', selectedCar.rentCostForDay.shortRent);
        return
      }
      if (daysInterval === 1) {
        setRentCost(selectedCar.rentCostForDay.shortRent);
        console.log('=== 1', selectedCar.rentCostForDay.shortRent);
        return
      }
      if (daysInterval <= 5) {
        console.log('<= 5', selectedCar.rentCostForDay.averageRent);
        setRentCost(selectedCar.rentCostForDay.averageRent);
        return
      }
      if (daysInterval >= 6) {
        console.log('>= 6', selectedCar.rentCostForDay.longRent);
        setRentCost(selectedCar.rentCostForDay.longRent);
        return
      }
    }
    
  }, [startDate, finishDate, model]);
  
  console.log('Interval in days:', daysInterval);
  useEffect(() => {});

  const handleForm = () => {};

  return (
    <>
      <div>
        <select onChange={handleSelectClass}>
          {uniqueClasses.map((clas) => (
            <option key={clas} value={clas}>
              {clas}
            </option>
          ))}
        </select>
        <select onChange={(e) => handleSelectModel(e)}>
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
