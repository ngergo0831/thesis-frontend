import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { LayoutSwitch } from './LayoutSwitch';

export const LoginRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/success" component={LayoutSwitch} />
        <Route component={Login} />
      </Switch>
    </BrowserRouter>
  );
};
