import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Button, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { userSignUp } from '@/shared/api';
import { getPageUrl } from '@/shared/config';
import { SignUpRequest } from '@/shared/interfaces';
import { useAppDispatch } from '@/shared/store/hooks';
import { fetchUser } from '@/shared/store/user/user.action';
import {
  validationRules,
  Field,
  getReasonMessage,
  showErrorMessage,
} from '@/shared/utils';
import { ButtonOauthYandex, MainContainer } from '@/widgets';
import cls from './RegistrationPage.module.scss';

const regInitialState = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  password: '',
  phone: '',
};

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (values: SignUpRequest): void => {
    userSignUp(values)
      .then(async (res) => {
        if (res.id) {
          await dispatch(fetchUser())
            .then(unwrapResult)
            .then((data) => {
              if (data) {
                navigate(getPageUrl('game'));
              }
            });
        }
      })
      .catch((error) => {
        if (getReasonMessage(error) === 'User already in system') {
          navigate(getPageUrl('game'));
        } else {
          showErrorMessage(error);
        }
      });
  };

  return (
    <MainContainer title="Sign Up" width={344}>
      <Form
        className={cls.registrationPageWrapper}
        layout="vertical"
        initialValues={regInitialState}
        onFinish={handleSubmit}
        validateTrigger={['onBlur', 'onSubmit']}
      >
        <Form.Item
          className={cls.registrationPageItem}
          name="first_name"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Please enter your name.',
            },
            {
              pattern: validationRules[Field.FirstName],
              message:
                'The name must begin with a capital letter and contain only letters and a hyphen.',
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input id="first_name" type="text" placeholder="First Name" />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="second_name"
          label="Last Name"
          rules={[
            {
              required: true,
              message: 'Please enter your last name.',
            },
            {
              pattern: validationRules[Field.SecondName],
              message:
                'The last name must begin with a capital letter and contain only letters and a hyphen.',
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input id="second_name" type="text" placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
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
                'The login must be from 3 to 20 characters, contain letters and numbers, and may include hyphens and underscores.',
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input id="login" type="text" placeholder="Login" />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please enter your email.',
            },
            {
              pattern: validationRules[Field.Email],
              message: 'Email must be a valid email address.',
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input id="email" type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: 'Please enter your phone number.',
            },
            {
              pattern: validationRules[Field.Phone],
              message:
                'The phone number must be between 10 and 15 digits and may begin with a plus.',
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input id="phone" type="tel" placeholder="Phone" />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
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
                'The password must be from 8 to 40 characters and contain at least one capital letter and a number.',
            },
          ]}
          validateTrigger="onBlur"
        >
          <Input id="password" type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item className={cls.registrationPageButton}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>

        <Form.Item className={cls.registrationPageButton}>
          <ButtonOauthYandex title="Sign Up with Yandex" />
        </Form.Item>

        <Form.Item className={cls.registrationPageButton}>
          <NavLink to={getPageUrl('login')}>
            <Button type="link">Sign In</Button>
          </NavLink>
        </Form.Item>
      </Form>
    </MainContainer>
  );
};
