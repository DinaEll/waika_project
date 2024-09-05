import { Button, Form, Input } from 'antd';
import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getPageUrl } from '@/shared/config/router/routerConfig';
import { LogoWithModal } from '@/widgets/LogoWithModal';
import cls from './LoginPage.module.scss';

const loginInitialState = {
  login: '',
  password: '',
};

interface signInRequest {
  login: string;
  password: string;
}

export const LoginPage = () => {
  const [formData, setFormData] = useState(loginInitialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (values: signInRequest): void => {
    //TODO: add User sign in logic
    console.log(values);
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
        onFinish={handleSubmit}
      >
        <Form.Item className={cls.loginPageItem} name="login" label="Login">
          <Input
            id="login"
            type="text"
            placeholder="Login"
            value={formData.login}
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item
          className={cls.loginPageItem}
          name="password"
          label="Password"
        >
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
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
