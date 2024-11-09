import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Form, Input } from 'antd';
import { AxiosError } from 'axios';
import { type FC } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { userSignIn } from '@/shared/api';
import { addUserToDb } from '@/shared/api/user/addUserToDb';
import { getUserFromDb } from '@/shared/api/user/getUserFromDb';
import { getPageUrl } from '@/shared/config';
import { usePage } from '@/shared/hooks';
import type { SignInRequest } from '@/shared/interfaces';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { fetchUser } from '@/shared/store/user/user.action';
import { isUserAuthSelector } from '@/shared/store/user/user.selector';
import {
  validationRules,
  Field,
  showErrorMessage,
  getReasonMessage,
  initPageBase,
} from '@/shared/utils';
import { ButtonOauthYandex, MainContainer } from '@/widgets';
import cls from './LoginPage.module.scss';

const loginInitialState = {
  login: '',
  password: '',
};

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  usePage({ initPage: initPageBase });

  const isUserAuth = useAppSelector(isUserAuthSelector);

  if (isUserAuth) {
    return <Navigate to={getPageUrl('main')} replace />;
  }

  const handleSubmit = (values: SignInRequest): void => {
    userSignIn(values)
      .then(() => {
        dispatch(fetchUser())
          .then(unwrapResult)
          .then(async (res) => {
            if (res.id) {
              try {
                await getUserFromDb(String(res.id));
              } catch (error) {
                if (error instanceof AxiosError && error.status === 404) {
                  await addUserToDb(res);
                } else {
                  console.error(error);
                }
              }
              navigate(getPageUrl('main'));
            }
          })
          .catch((error) => {
            showErrorMessage(error);
          });
      })
      .catch((error) => {
        if (getReasonMessage(error) === 'User already in system') {
          navigate(getPageUrl('main'));
        } else {
          showErrorMessage(error);
        }
      });
  };

  return (
    <MainContainer width={344} title="Sign In">
      <Form
        className={cls.loginPageWrapper}
        layout="vertical"
        initialValues={loginInitialState}
        onFinish={handleSubmit}
        validateTrigger={['onBlur', 'onSubmit']}
      >
        <Form.Item
          className={cls.loginPageItem}
          name="login"
          label="Login"
          rules={[
            {
              required: true,
              message: 'Please enter your login.',
            },
            {
              pattern: validationRules[Field.Login],
              message:
                'The login must be from 3 to 20 characters long and contain letters and numbers.',
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input id="login" type="text" placeholder="Login" />
        </Form.Item>

        <Form.Item
          className={cls.loginPageItem}
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please enter your password.',
            },
            {
              pattern: validationRules[Field.Password],
              message:
                'The password must be between 8 and 40 characters long and contain at least one capital letter and a number.',
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input id="password" type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item className={cls.loginPageButton}>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>

        <Form.Item className={cls.loginPageButton}>
          <ButtonOauthYandex title="Sign In with Yandex" />
        </Form.Item>

        <Form.Item className={cls.loginPageButton}>
          <NavLink to={getPageUrl('registration')}>
            <Button type="link">Sign Up</Button>
          </NavLink>
        </Form.Item>
      </Form>
    </MainContainer>
  );
};
