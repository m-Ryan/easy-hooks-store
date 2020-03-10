import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from '../modal';
import { TodoList } from '../pages/todoList';
export const router = (
  <Provider>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={TodoList}></Route>
      </Switch>
    </BrowserRouter>
  </Provider>
);
