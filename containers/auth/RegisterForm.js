import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import {
  changeField,
  checkExistName,
  checkExistUsername,
  initializeForm,
  register,
} from '../../module/redux/auth';

const RegisterForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    form,
    user,
    registerResult,
    registerResultError,
    isNotExistUsername,
    isNotExistUsernameError,
    isNotExistName,
    isNotExistNameError,
  } = useSelector(({ auth, user }) => ({
    form: auth.register,
    user: user.user,
    isNotExistUsername: auth.checkExistUsernameResult,
    isNotExistUsernameError: auth.checkExistUsernameResultError,
    isNotExistName: auth.checkExistNameResult,
    isNotExistNameError: auth.checkExistNameResultError,
    registerResult: auth.registerResult,
    registerResultError: auth.registerResultError,
  }));

  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState({
    username: true,
    password: true,
    passwordConfirm: true,
    name: true,
  });
  const [validMessage, setValidMessage] = useState({
    username: null,
    password: null,
    passwordConfirm: null,
    name: null,
  });
  const MIN_PASSWORD_LENGTH = 8;

  const handleChange = useCallback(
    (key, value) => {
      setError(null);
      dispatch(changeField({ form: 'register', key, value }));
      if (key === 'username') {
        setIsValid((prevState) => ({ ...prevState, username: true }));
        setValidMessage((prevState) => ({
          ...prevState,
          username: null,
        }));
      } else if (key === 'name' && isValid.username) {
        setIsValid((prevState) => ({ ...prevState, name: true }));
        setValidMessage((prevState) => ({
          ...prevState,
          name: null,
        }));
      }
    },
    [dispatch, isValid.username],
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
    if (form.username !== '') {
      dispatch(checkExistUsername({ username: form.username }));
    }
  }, [form.username, dispatch]);

  useEffect(() => {
    if (isNotExistUsernameError) {
      setIsValid((prevState) => ({ ...prevState, username: false }));
      setValidMessage((prevState) => ({
        ...prevState,
        username: '인증 서버 연결에 실패했습니다.',
      }));
    } else if (!isNotExistUsername) {
      return;
    } else if (isNotExistUsername.result) {
      setIsValid((prevState) => ({ ...prevState, username: true }));
      setValidMessage((prevState) => ({
        ...prevState,
        username: null,
      }));
    } else if (!isNotExistUsername.result) {
      setIsValid((prevState) => ({ ...prevState, username: false }));
      setValidMessage((prevState) => ({
        ...prevState,
        username: isNotExistUsername ? isNotExistUsername.message : null,
      }));
    }
  }, [isNotExistUsername, isNotExistUsernameError]);

  useEffect(() => {
    const isValidPassword =
      form.password.length >= MIN_PASSWORD_LENGTH || form.password.length === 0;
    setIsValid((prevState) => ({ ...prevState, password: isValidPassword }));
    if (isValidPassword) {
      setValidMessage((prevState) => ({ ...prevState, password: null }));
    } else {
      setValidMessage((prevState) => ({
        ...prevState,
        password: '비밀번호는 8자 이상 입력해야 합니다.',
      }));
    }
  }, [form.password]);

  useEffect(() => {
    const isValidPassword =
      form.passwordConfirm === form.password ||
      form.passwordConfirm.length === 0;
    setIsValid((prevState) => ({
      ...prevState,
      passwordConfirm: isValidPassword,
    }));
    if (isValidPassword) {
      setValidMessage((prevState) => ({ ...prevState, passwordConfirm: null }));
    } else {
      setValidMessage((prevState) => ({
        ...prevState,
        passwordConfirm: '비밀번호가 일치하지 않습니다.',
      }));
    }
  }, [form.password, form.passwordConfirm]);

  useEffect(() => {
    const username = form.username;
    const name = form.name;
    if (name === '') {
      return;
    }
    if (!isNotExistUsername || !isNotExistUsername.result) {
      setIsValid((prevState) => ({ ...prevState, name: false }));
      setValidMessage((prevState) => ({
        ...prevState,
        name: '계정 이름이 유효하지 않습니다.',
      }));
      return;
    }
    dispatch(checkExistName({ username, name }));
  }, [form.username, form.name, dispatch, isNotExistUsername]);

  useEffect(() => {
    if (isNotExistNameError) {
      setIsValid((prevState) => ({ ...prevState, name: false }));
      setValidMessage((prevState) => ({
        ...prevState,
        name: '인증 서버 연결에 실패했습니다.',
      }));
    } else if (!isNotExistName) {
      return;
    } else if (isNotExistName.result) {
      setIsValid((prevState) => ({ ...prevState, name: true }));
      setValidMessage((prevState) => ({
        ...prevState,
        name: null,
      }));
    } else if (!isNotExistName.result) {
      setIsValid((prevState) => ({ ...prevState, name: false }));
      setValidMessage((prevState) => ({
        ...prevState,
        name: isNotExistName ? isNotExistName.message : null,
      }));
    }
  }, [isNotExistName, isNotExistNameError]);

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

  useEffect(() => {
    return () => {
      dispatch(initializeForm('register'));
    };
  }, [dispatch]);

  return (
    <AuthForm
      type="register"
      form={form}
      isValid={isValid}
      validMessage={validMessage}
      onChange={handleChange}
      onSubmit={handleOnRegister}
      error={error}
      user={user}
      navigation={navigation}
    />
  );
};

export default RegisterForm;
