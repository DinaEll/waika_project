import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Button, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { userSignUp } from '@/shared/api';
import { getPageUrl } from '@/shared/config';
import { SignUpRequest } from '@/shared/interfaces';
import { useAppDispatch } from '@/shared/store/hooks';
import { fetchUser } from '@/shared/store/user/user.action';
import { validationRules, Field } from '@/utils/validationRules';
import { MainContainer } from '@/widgets/MainContainer';
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
    void userSignUp(values)
      .then(async (res) => {
        if (res.id) {
          await dispatch(fetchUser(''))
            .then(unwrapResult)
            .then((data) => {
              if (data) {
                navigate(getPageUrl('game'));
              }
            });
        }
      })
      .catch(console.error);
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
              message: 'Пожалуйста, введите ваше имя.',
            },
            {
              pattern: validationRules[Field.FirstName],
              message:
                'Имя должно начинаться с заглавной буквы и содержать только буквы и дефис.',
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
              message: 'Пожалуйста, введите вашу фамилию.',
            },
            {
              pattern: validationRules[Field.SecondName],
              message:
                'Фамилия должна начинаться с заглавной буквы и содержать только буквы и дефис.',
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
              message: 'Пожалуйста, введите логин.',
            },
            {
              pattern: validationRules[Field.Login],
              message:
                'Логин должен быть от 3 до 20 символов, содержать буквы и цифры, может включать дефисы и подчеркивания.',
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
              message: 'Пожалуйста, введите email.',
            },
            {
              pattern: validationRules[Field.Email],
              message: 'Email должен быть валидным адресом электронной почты.',
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
              message: 'Пожалуйста, введите номер телефона.',
            },
            {
              pattern: validationRules[Field.Phone],
              message:
                'Номер телефона должен быть от 10 до 15 цифр и может начинаться с плюса.',
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
              message: 'Пожалуйста, введите пароль.',
            },
            {
              pattern: validationRules[Field.Password],
              message:
                'Пароль должен быть от 8 до 40 символов, содержать хотя бы одну заглавную букву и цифру.',
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
          <NavLink to={getPageUrl('login')}>
            <Button type="link">Sign In</Button>
          </NavLink>
        </Form.Item>
      </Form>
    </MainContainer>
  );
};
