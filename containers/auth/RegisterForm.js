import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField } from '../../module/redux/auth';

const RegisterForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { form, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    user: user.user,
  }));

  const handleChange = (key, value) => {
    dispatch(changeField({ form: 'register', key, value }));
  };

  const handleOnRegister = () => {};

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={handleChange}
      onSubmit={handleOnRegister}
      user={user}
      navigation={navigation}
    />
  );
};

export default RegisterForm;