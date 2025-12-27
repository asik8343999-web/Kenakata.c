
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const disableSecurityFeatures = () => {
  // Disable right-click
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // Disable specific shortcuts: Ctrl + (+, -, U, S, Shift+I, Shift+J, Shift+C)
  document.addEventListener('keydown', (e) => {
    if (
      (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
      (e.key === 'F12')
    ) {
      e.preventDefault();
      return false;
    }
  });
};

disableSecurityFeatures();

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
