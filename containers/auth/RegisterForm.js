import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, register } from '../../module/redux/auth';

const RegisterForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { form, user, registerResult, registerResultError } = useSelector(
    ({ auth, user }) => ({
      form: auth.register,
      user: user.user,
      registerResult: auth.registerResult,
      registerResultError: auth.registerResultError,
    }),
  );

  const [error, setError] = useState(null);

  const handleChange = useCallback(
    (key, value) => {
      setError(null);
      dispatch(changeField({ form: 'register', key, value }));
    },
    [dispatch],
  );

  const handleOnRegister = useCallback(() => {
    const { username, password, passwordConfirm, name } = form;
    if ([username, password, passwordConfirm, name].includes('')) {
      setError('빈 칸을 모두 입력해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }
    dispatch(register({ username, password, name }));
  }, [dispatch, form]);

  useEffect(() => {
    if (registerResultError) {
      if (registerResultError.response.status === 409) {
        setError('이미 존재하는 계정입니다.');
        return;
      }
      setError('회원가입 실패');
      return;
    }
    if (registerResult) {
      navigation.goBack();
    }
  }, [registerResult, registerResultError, navigation]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={handleChange}
      onSubmit={handleOnRegister}
      error={error}
      user={user}
      navigation={navigation}
    />
  );
};

export default RegisterForm;
