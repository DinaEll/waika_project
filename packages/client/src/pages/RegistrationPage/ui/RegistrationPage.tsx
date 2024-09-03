import cls from './RegistrationPage.module.scss';
import { ChangeEvent, useState } from 'react';
import { Form, Button, Input } from 'antd';
import { getPageUrl } from '@/shared/config/router/routerConfig';
import { NavLink } from 'react-router-dom';
import { LogoWithModal } from '@/widgets/LogoWithModal';

const regInitialState = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  password: '',
  phone: '',
};

interface SignUpRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export const RegistrationPage = () => {
  const [formData, setFormData] = useState(regInitialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (values: SignUpRequest): void => {
    //TODO: add User sign up logic
  };

  return (
    <LogoWithModal
      open={true}
      centered={true}
      closable={false}
      footer={null}
      width={344}
      mask={false}
      transitionName={''}
      title="Sign Up"
    >
      <Form
        className={cls.registrationPageWrapper}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          className={cls.registrationPageItem}
          name="first_name"
          label="First Name"
        >
          <Input
            id="first_name"
            type="text"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="second_name"
          label="Last Name"
        >
          <Input
            id="second_name"
            type="text"
            placeholder="Last Name"
            value={formData.second_name}
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="login"
          label="Login"
        >
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
          className={cls.registrationPageItem}
          name="email"
          label="Email"
        >
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="phone"
          label="Phone"
        >
          <Input
            id="phone"
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
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
    </LogoWithModal>
  );
};
