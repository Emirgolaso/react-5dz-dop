import React, { useState, useEffect } from 'react';
import './style.css';

const ClickerWithTimer = () => {
  const [clicks, setClicks] = useState(0);
  const [timer, setTimer] = useState(60);
  const [recentClicks, setRecentClicks] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.toFixed(2) > 0) {
        setTimer(timer.toFixed(2) - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer.toFixed(2)]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecentClicks(clicks);
    }, 10000);

    return () => clearInterval(interval);
  }, [clicks]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSetTimer = () => {
    const timeInSeconds = parseInt(inputValue, 10);
    if (!isNaN(timeInSeconds)) {
      setTimer(timeInSeconds);
    }
  };

  const handleReset = () => {
    setClicks(0);
    setRecentClicks(0);
    setTimer(0);
    setInputValue('');
  };

  return (
    <div className='blok'>
      <h2>Кликер с таймером</h2>
      <p className='p1'>Осталось времени: {(timer.toFixed(2))} секунд</p>
      <p className='p2'>Общее количество кликов: {clicks}</p>
      <p className='p3'>Количество кликов за последние {inputValue} секунд:{clicks}</p>
      <input
      className='input'
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Введите время (в секундах)"
      />
      <button className='time' onClick={handleSetTimer}>Установить таймер</button>
      {timer > 0 ? (
        <button className='click' onClick={handleClick}>Кликни здесь</button>
      ) : (
        <p>Время вышло!</p>
      )}
      <button className='reset' onClick={handleReset}>Сбросить</button>
    </div>
  );
};

export default ClickerWithTimer;
