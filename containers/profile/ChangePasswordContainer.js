import React, { useCallback, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native-appearance';
import { useDispatch, useSelector } from 'react-redux';
import ChangePassword from '../../components/profile/ChangePassword';
import {
  changeField,
  changePassword,
  initializeChangePassword,
} from '../../module/redux/user';

const ChangePasswordContainer = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const {
    user,
    form,
    changePasswordResult,
    changePasswordError,
    changePasswordLoading,
  } = useSelector(({ user, loading }) => ({
    user: user.user,
    form: user.password,
    changePasswordResult: user.changePasswordResult,
    changePasswordError: user.changePasswordError,
    changePasswordLoading: loading['user/CHANGE_PASSWORD'],
  }));

  const [isValid, setIsValid] = useState({
    curPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [validMessage, setValidMessage] = useState({
    curPassword: null,
    newPassword: null,
    confirmPassword: null,
  });
  const [submitPassword, setSubmitPassword] = useState({
    result: false,
    message: null,
  });
  const MIN_LENGTH = 8;

  const handleBackButton = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleChange = useCallback(
    (key, value) => {
      if (key === 'curPassword') {
        setValidMessage({
          ...validMessage,
          curPassword: null,
        });
      }
      if (submitPassword.message) {
        setSubmitPassword({
          result: false,
          message: null,
        });
      }
      dispatch(changeField({ form: 'password', key, value }));
    },
    [dispatch, submitPassword, validMessage],
  );

  const handleSubmit = useCallback(() => {
    const {
      curPassword: isCurValid,
      newPassword: isNewValid,
      confirmPassword: isConfirmValid,
    } = isValid;
    const { curPassword, newPassword } = form;
    if (isCurValid && isNewValid && isConfirmValid) {
      dispatch(
        changePassword({ id: user._id, password: curPassword, newPassword }),
      );
    }
  }, [dispatch, form, user, isValid]);

  useEffect(() => {
    const isValidNewPassword =
      form.newPassword && form.newPassword.length >= MIN_LENGTH;
    const isValidConfirmPassword =
      form.confirmPassword === form.newPassword &&
      form.confirmPassword.length >= MIN_LENGTH;
    setIsValid({
      curPassword: form.curPassword !== '',
      newPassword:
        form.newPassword !== '' &&
        isValidNewPassword &&
        form.newPassword !== form.curPassword,
      confirmPassword: form.confirmPassword !== '' && isValidConfirmPassword,
    });
    if (!isValidNewPassword && form.newPassword !== '') {
      setValidMessage((prevState) => ({
        ...prevState,
        newPassword: '비밀번호는 8자 이상 입력해야 합니다.',
      }));
    } else if (
      isValidNewPassword &&
      form.newPassword !== '' &&
      form.newPassword === form.curPassword
    ) {
      setValidMessage((prevState) => ({
        ...prevState,
        newPassword: '기존 비밀번호와 일치합니다.',
      }));
    } else if (isValidNewPassword || form.newPassword === '') {
      setValidMessage((prevState) => ({
        ...prevState,
        newPassword: null,
      }));
    }
    if (!isValidConfirmPassword && form.confirmPassword !== '') {
      setValidMessage((prevState) => ({
        ...prevState,
        confirmPassword: '비밀번호가 일치하지 않습니다!',
      }));
    } else if (isValidConfirmPassword || form.confirmPassword === '') {
      setValidMessage((prevState) => ({ ...prevState, confirmPassword: null }));
    }
  }, [form]);

  useEffect(() => {
    if (changePasswordResult) {
      setSubmitPassword({
        result: true,
        message: '비밀번호가 성공적으로 변경되었습니다.',
      });
      dispatch(initializeChangePassword());
    } else if (changePasswordError) {
      if (
        changePasswordError.response &&
        changePasswordError.response.status === 412
      ) {
        setSubmitPassword({ result: false, message: null });
        setIsValid((prevState) => ({ ...prevState, curPassword: false }));
        setValidMessage((prevState) => ({
          ...prevState,
          curPassword: '기존 비밀번호가 일치하지 않습니다.',
        }));
      } else {
        setSubmitPassword({
          result: false,
          message: '비밀번호 변경에 실패했습니다.',
        });
      }
    }
  }, [dispatch, changePasswordResult, changePasswordError]);

  useEffect(() => {
    return () => {
      dispatch(initializeChangePassword());
    };
  }, [dispatch]);

  return (
    <ChangePassword
      colorScheme={colorScheme}
      form={form}
      handleBackButton={handleBackButton}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isValid={isValid}
      validMessage={validMessage}
      submitPassword={submitPassword}
      changePasswordLoading={changePasswordLoading}
    />
  );
};

export default ChangePasswordContainer;
