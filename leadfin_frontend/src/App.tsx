import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './AppRouter';
import Header from './components/header/header';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}
