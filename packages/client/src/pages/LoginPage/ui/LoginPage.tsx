import { Button, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { userSignIn, getUser } from '@/shared/api';
import { getPageUrl } from '@/shared/config';
import { SignInRequest } from '@/shared/interfaces';
import { validationRules, Field } from '@/utils/validationRules';
import { LogoWithModal } from '@/widgets/LogoWithModal';
import cls from './LoginPage.module.scss';

const loginInitialState = {
  login: '',
  password: '',
};

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: SignInRequest): void => {
    void userSignIn(values).then(() => {
      void getUser().then((res) => {
        if (res.id) {
          navigate(getPageUrl('game-startup'));
        }
      });
    });
  };

  return (
    <LogoWithModal
      open
      centered
      closable={false}
      footer={null}
      width={344}
      mask={false}
      transitionName={undefined}
      title="Sign In"
    >
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
              message: 'Пожалуйста, введите ваш логин.',
            },
            {
              pattern: validationRules[Field.Login],
              message:
                'Логин должен быть длиной от 3 до 20 символов и содержать буквы и цифры.',
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
              message: 'Пожалуйста, введите ваш пароль.',
            },
            {
              pattern: validationRules[Field.Password],
              message:
                'Пароль должен иметь длину от 8 до 40 символов, содержать хотя бы одну заглавную букву и цифру.',
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
          <NavLink to={getPageUrl('registration')}>
            <Button type="link">Sign Up</Button>
          </NavLink>
        </Form.Item>
      </Form>
    </LogoWithModal>
  );
};
