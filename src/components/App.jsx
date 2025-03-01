import { useState, useEffect, useRef, useId } from 'react';
import './App.css';
console.log('App was attached saccessfully. Hooks:', {
  useState,
  useEffect,
  useRef,
  useId,
});

function App() {
  return (
    <div className="main-container">
      <h1>Приклад заголовка</h1>
      <p>Приклад параграфу</p>
      <button>Зроби щось</button>
    </div>
  );
}

export default App;
