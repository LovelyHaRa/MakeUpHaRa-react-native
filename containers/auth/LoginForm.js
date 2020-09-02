import React, { useCallback, useEffect, useState } from 'react';
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

  const [error, setError] = useState(null);

  const handleChange = useCallback(
    (key, value) => {
      setError(null);
      dispatch(changeField({ form: 'login', key, value }));
    },
    [dispatch],
  );

  const handleOnLogin = useCallback(() => {
    setError(null);
    const { username, password } = form;
    if ([username, password].includes('')) {
      setError('비어있는 항목이 있습니다.');
      return;
    }
    dispatch(login({ username, password }));
  }, [dispatch, form]);

  useEffect(() => {
    if (authError) {
      setError('ID 또는 비밀번호가 일치하지 않습니다.');
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
      error={error}
      user={user}
      navigation={navigation}
    />
  );
};

export default LoginForm;
