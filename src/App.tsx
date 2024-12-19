import React from 'react';
import './App.scss';
import { store } from './states/store';
import { WeatherApp } from './componentes/weatherApp';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={ store }>
      <WeatherApp />
    </Provider>
  );
}

export default App;