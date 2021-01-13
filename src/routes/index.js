import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AsyncComponent from '../components/hoc/AsyncComponent';
import PrivateRoute from '../components/PrivateRoute';

const Home = AsyncComponent(() => {
  return import('../views/Home');
});

const Login = AsyncComponent(() => {
  return import('../views/auth/Login');
});

const Signup = AsyncComponent(() => {
  return import('../views/auth/Signup');
});

const UserActivation = AsyncComponent(() => {
  return import('../views/auth/UserActivation');
});

const ForgotPassword = AsyncComponent(() => {
  return import('../views/auth/ForgotPassword');
});

const ResetPassword = AsyncComponent(() => {
  return import('../views/auth/ResetPassword');
});

const Logout = AsyncComponent(() => {
  return import('../components/Logout');
});

const ViewProfile = AsyncComponent(() => {
  return import('../views/users/ViewProfile');
});

const EditProfile = AsyncComponent(() => {
  return import('../views/users/EditProfile');
});

const NewArticle = AsyncComponent(() => {
  return import('../views/articles/NewArticle');
});

const ViewArticle = AsyncComponent(() => {
  return import('../views/articles/ViewArticle');
});

const EditArticle = AsyncComponent(() => {
  return import('../views/articles/EditArticle');
});

const PageNotFound = AsyncComponent(() => {
  return import('../views/errors/404');
});

const Search = AsyncComponent(() => {
  return import('../views/Search');
});

const Settings = AsyncComponent(() => {
  return import('../views/users/Settings');
});

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={Signup} />
      <Route path="/auth/activate/:token" component={UserActivation} />
      <Route path="/auth/logout" component={Logout} />
      <Route path="/auth/forgot-password" component={ForgotPassword} />
      <Route path="/auth/reset-password/:token" component={ResetPassword} />
      <PrivateRoute exact path="/profile/me" component={ViewProfile} />
      <PrivateRoute path="/profile/me/edit" component={EditProfile} />
      <PrivateRoute path="/profile/settings" component={Settings} />
      <PrivateRoute path="/articles/new" component={NewArticle} />
      <Route exact path="/articles/:articleSlug" component={ViewArticle} />
      <PrivateRoute
        path="/articles/:articleSlug/edit"
        component={EditArticle}
      />
      <Route path="/search" component={Search} />
      <Route exact path="*" component={PageNotFound} />
    </Switch>
  );
};

export default Routes;
