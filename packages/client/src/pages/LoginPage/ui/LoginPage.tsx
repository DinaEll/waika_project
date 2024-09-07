import cls from './LoginPage.module.scss'
import { ChangeEvent, useState } from 'react'
import { LogoWithModal } from '@/widgets/LogoWithModal'
import { Button, Form, Input } from 'antd'
import { NavLink } from 'react-router-dom'
import { getPageUrl } from '@/shared/config/router/routerConfig'
import { validationRules, Fields } from '@/utils/validationRules'

const loginInitialState = {
  login: '',
  password: '',
}

interface signInRequest {
  login: string
  password: string
}

export const LoginPage = () => {
  const [formData, setFormData] = useState(loginInitialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (values: signInRequest): void => {
    // TODO: add User sign in logic
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
        onFinish={handleSubmit}
        validateTrigger={['onBlur', 'onSubmit']}>
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
              pattern: validationRules[Fields.LOGIN],
              message:
                'Логин должен быть длиной от 3 до 20 символов и содержать буквы и цифры.',
            },
          ]}
          validateTrigger="onBlur">
          <Input
            id="login"
            type="text"
            placeholder="Login"
            value={formData.login}
            onChange={handleChange}
          />
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
              pattern: validationRules[Fields.PASSWORD],
              message:
                'Пароль должен иметь длину от 8 до 40 символов, содержать хотя бы одну заглавную букву и цифру.',
            },
          ]}
          validateTrigger="onBlur">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
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
