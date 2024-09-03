import cls from './LoginPage.module.scss'
import { LogoWithModal } from '@/widgets/LogoWithModal'
import { Button, Form, Input } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { getPageUrl } from '@/shared/config/router/routerConfig'
import { SignInRequest, userSignIn, getUser } from '@/shared/api'

const loginInitialState = {
  login: '',
  password: '',
}

export const LoginPage = () => {
  const navigate = useNavigate()

  const handleSubmit = (values: SignInRequest): void => {
    userSignIn(values).then(() => {
      getUser().then(res => {
        if (res?.id) {
          navigate(getPageUrl('game-startup'))
        }
      })
    })
  }

  return (
    <LogoWithModal
      open={true}
      centered={true}
      closable={false}
      footer={null}
      width={344}
      mask={false}
      transitionName={''}
      title="Sign In">
      <Form
        className={cls.loginPageWrapper}
        layout="vertical"
        initialValues={loginInitialState}
        onFinish={handleSubmit}>
        <Form.Item className={cls.loginPageItem} name="login" label="Login">
          <Input id="login" type="text" placeholder="Login" required />
        </Form.Item>

        <Form.Item
          className={cls.loginPageItem}
          name="password"
          label="Password">
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
  )
}
