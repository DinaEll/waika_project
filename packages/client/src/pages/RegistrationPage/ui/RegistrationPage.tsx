import { Form, Button, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { userSignUp, getUser } from '@/shared/api';
import { getPageUrl } from '@/shared/config';
import { SignUpRequest } from '@/shared/interfaces';
import { LogoWithModal } from '@/widgets/LogoWithModal';
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

  const handleSubmit = (values: SignUpRequest): void => {
    void userSignUp(values).then((res) => {
      if (res.id) {
        void getUser().then(() => {
          navigate(getPageUrl('game-startup'));
        });
      }
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
      title="Sign Up"
    >
      <Form
        className={cls.registrationPageWrapper}
        layout="vertical"
        initialValues={regInitialState}
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
            required
          />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="login"
          label="Login"
        >
          <Input id="login" type="text" placeholder="Login" required />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="email"
          label="Email"
        >
          <Input id="email" type="email" placeholder="Email" required />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="phone"
          label="Phone"
        >
          <Input id="phone" type="tel" placeholder="Phone" required />
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
