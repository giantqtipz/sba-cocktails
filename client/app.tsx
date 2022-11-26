import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { app } from './components/config/firebase';
import { Cocktail, Header, Main, Popup } from './components/index';
import { ModalAttributes } from './store/modal/interface';
import { logInPersistence } from './store/authentication/actions';
import { StoreState } from './store/store';

const App: React.FC = () => {
  const { BodyModal, open, title }: ModalAttributes = useSelector(
    (state: StoreState) => state.modal
  );
  const dispatch = useDispatch();
  useEffect(() => {
    app.auth().onAuthStateChanged((user: any) => {
      if (user) dispatch(logInPersistence());
    });
  }, []);
  return (
    <React.StrictMode>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/cocktails/:id" component={Cocktail} />
      </Switch>
      <Popup BodyModal={BodyModal} open={open} title={title} />
    </React.StrictMode>
  );
};
//
export default App;
