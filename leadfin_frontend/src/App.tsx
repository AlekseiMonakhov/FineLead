import './App.css'
import AppRouter from './AppRouter';
import Header from './components/UI/header/header';

export default function App() {
  return (
    <div className='App'>
      <Header />
      <AppRouter />
    </div>
  );
}

