import cls from './RegistrationPage.module.scss'
import { Form, Button, Input } from 'antd'
import { getPageUrl } from '@/shared/config/router/routerConfig'
import { NavLink, useNavigate } from 'react-router-dom'
import { LogoWithModal } from '@/widgets/LogoWithModal'

const regInitialState = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  password: '',
  phone: '',
}

interface SignUpRequest {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export const RegistrationPage = () => {
  const navigate = useNavigate()

  const handleSubmit = (values: SignUpRequest): void => {
    const baseUrl = 'https://ya-praktikum.tech/api/v2'

    fetch(baseUrl + '/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(res => {
        if (res?.id) {
          fetch(baseUrl + '/auth/user', {
            method: 'GET',
            credentials: 'include',
          })
            .then(res => res.json())
            .then(res => {
              if (res?.id) {
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
      title="Sign Up">
      <Form
        className={cls.registrationPageWrapper}
        layout="vertical"
        initialValues={regInitialState}
        onFinish={handleSubmit}>
        <Form.Item
          className={cls.registrationPageItem}
          name="first_name"
          label="First Name">
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
          label="Last Name">
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
          label="Login">
          <Input id="login" type="text" placeholder="Login" required />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="email"
          label="Email">
          <Input id="email" type="email" placeholder="Email" required />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="phone"
          label="Phone">
          <Input id="phone" type="tel" placeholder="Phone" required />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="password"
          label="Password">
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
  )
}
