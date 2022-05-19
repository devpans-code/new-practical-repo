import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProductList from './Components/Product';
import ProductForm from './Components/Product/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={ProductList}
          />
          <Route
            exact
            path={["/add", "/edit/:id"]}
            component={ProductForm}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
