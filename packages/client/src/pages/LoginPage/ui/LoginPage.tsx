import { Button, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { SignInRequest, userSignIn, getUser } from '@/shared/api';
import { getPageUrl } from '@/shared/config';
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (res?.id) {
          navigate(getPageUrl('main'));
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
      >
        <Form.Item className={cls.loginPageItem} name="login" label="Login">
          <Input id="login" type="text" placeholder="Login" required />
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
