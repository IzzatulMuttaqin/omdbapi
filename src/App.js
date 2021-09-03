import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { MoviesList } from './features/movies-list/MoviesList';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MoviesList />
        </Route>
        <Route path="/counter">
          <Counter />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
