import { Route, Switch } from 'react-router-dom';

import classes from './App.module.css';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";


function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/' component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}
export default App;