import cls from './RegistrationPage.module.scss'
import { ChangeEvent, useState } from 'react'
import { Form, Button, Input } from 'antd'
import { getPageUrl } from '@/shared/config/router/routerConfig'
import { NavLink } from 'react-router-dom'
import { LogoWithModal } from '@/widgets/LogoWithModal'
import { validationRules, Fields } from '@/utils/validationRules'

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
  const [formData, setFormData] = useState(regInitialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (values: SignUpRequest): void => {
    // TODO: add User sign up logic
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
        onFinish={handleSubmit}
        validateTrigger={['onBlur', 'onSubmit']}>
        <Form.Item
          className={cls.registrationPageItem}
          name="first_name"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите свое имя!',
            },
            {
              pattern: validationRules[Fields.FIRST_NAME],
              message:
                'Имя должно начинаться с заглавной буквы и содержать только буквы и дефисы.',
            },
          ]}
          validateTrigger="onBlur">
          <Input
            id="first_name"
            type="text"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="second_name"
          label="Last Name"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите свою фамилию!',
            },
            {
              pattern: validationRules[Fields.SECOND_NAME],
              message:
                'Фамилия должна начинаться с заглавной буквы и содержать только буквы и дефисы.',
            },
          ]}
          validateTrigger="onBlur">
          <Input
            id="second_name"
            type="text"
            placeholder="Last Name"
            value={formData.second_name}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="login"
          label="Login"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите ваш логин!',
            },
            {
              pattern: validationRules[Fields.LOGIN],
              message:
                'Логин должен состоять из 3-20 символов и содержать буквы и цифры.',
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
          className={cls.registrationPageItem}
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите ваш адрес электронной почты!',
            },
            {
              pattern: validationRules[Fields.EMAIL],
              message:
                'Пожалуйста, введите действительный адрес электронной почты.',
            },
          ]}
          validateTrigger="onBlur">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите ваш номер телефона!',
            },
            {
              pattern: validationRules[Fields.PHONE],
              message:
                'Номер телефона должен состоять из 10–15 цифр и может начинаться со знака «+».',
            },
          ]}
          validateTrigger="onBlur">
          <Input
            id="phone"
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          className={cls.registrationPageItem}
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите ваш пароль!',
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
