import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((routes) => (
          <Route key={routes.path} path={routes.path} element={<routes.component />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;