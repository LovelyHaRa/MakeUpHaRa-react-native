import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, login, initializeForm } from '../../module/redux/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../module/redux/user';

const LoginForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const handleChange = (key, value) => {
    dispatch(changeField({ form: 'login', key, value }));
  };

  const handleOnLogin = () => {
    const { username, password } = form;
    if ([username, password].includes('')) {
      // TODO: empty input exception
      return;
    }
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (authError) {
      // TODO: LOGIN FAILURE
      return;
    }
    if (auth) {
      dispatch(check());
      dispatch(initializeForm('login'));
    }
    return () => {
      dispatch(initializeForm('login'));
    };
  }, [auth, authError, dispatch]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={handleChange}
      onSubmit={handleOnLogin}
      user={user}
      navigation={navigation}
    />
  );
};

export default LoginForm;
