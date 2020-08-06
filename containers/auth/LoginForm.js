import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from '../../module/redux/auth';
import AuthForm from '../../components/auth/AuthForm';

const LoginForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => ({ form: auth.login }));

  const handleChange = (key, value) => {
    dispatch(changeField({ form: 'login', key, value }));
  };

  return <AuthForm type="login" form={form} onChange={handleChange} />;
};

export default LoginForm;
