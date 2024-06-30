import React from 'react';
// import { BrowserRouter, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
      <Route>
        <App exact path="/" component={Dashboard} />
        <App path="/login" component={Login} />
        <App path="/register" component={Register} />
      </Route>
    </div>
  );
};

export default App;
