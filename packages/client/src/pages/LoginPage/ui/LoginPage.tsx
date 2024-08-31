import cls from './LoginPage.module.scss'
import { LogoWithModal } from '@/widgets/LogoWithModal'
import { Button, Form, Input } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { getPageUrl } from '@/shared/config/router/routerConfig'

const loginInitialState = {
  login: '',
  password: '',
}

interface SignInRequest {
  login: string
  password: string
}

export const LoginPage = () => {
  const navigate = useNavigate()

  const handleSubmit = (values: SignInRequest): void => {
    const baseUrl = 'https://ya-praktikum.tech/api/v2'

    fetch(baseUrl + '/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify(values),
    })
      .then(res => {
        if (res.status === 200) {
          fetch(baseUrl + '/auth/user', {
            method: 'GET',
            credentials: 'include',
          })
            .then(res => res.json())
            .then(res => {
              if (res.id) {
                navigate(getPageUrl('main'))
              }
            })
            .catch(error => console.error(error))
        }
      })
      .catch(error => console.error(error))
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
