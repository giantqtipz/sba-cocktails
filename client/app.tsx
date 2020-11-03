import React from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Cocktail, Header, Main, Popup } from './components/index';
import { ModalAttributes } from './store/modal/interface';
import { StoreState } from './store/store';

const App: React.FC = () => {
  const { BodyModal, open, title }: ModalAttributes = useSelector(
    (state: StoreState) => state.modal
  );
  return (
    <React.StrictMode>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/cocktails/:id" component={Cocktail} />
        </Switch>
      </Router>
      <Popup BodyModal={BodyModal} open={open} title={title} />
    </React.StrictMode>
  );
};

export default App;
