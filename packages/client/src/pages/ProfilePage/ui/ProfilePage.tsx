import { Button, Form, Input, Avatar } from 'antd'
import { ModalComponent } from '@/widgets/ModalComponent'
import React from 'react'
import Title from 'antd/lib/typography/Title'
import cls from './ProfilePage.module.scss'
import { UserOutlined } from '@ant-design/icons'

export const ProfilePage = () => {
  return (
    <ModalComponent
      open={true}
      mask={false}
      closeIcon={null}
      footer={null}
      width={500}
      classNames={{
        content: cls.profileModal,
      }}>
      <Avatar
        className={cls.profileAvatar}
        size={108}
        icon={<UserOutlined style={{ fontSize: '32px' }} />}
      />
      <Title level={3}>Your Profile</Title>
      <Form layout="vertical">
        <Form.Item
          name="first_name"
          label="First Name"
          layout="vertical"
          labelCol={{ span: 86 }}>
          <Input
            id="first_name"
            type="text"
            placeholder="First Name"
            required
          />
        </Form.Item>

        <Form.Item name="second_name" label="Last Name" layout="vertical">
          <Input
            id="second_name"
            type="text"
            placeholder="Last Name"
            required
          />
        </Form.Item>

        <Form.Item name="login" label="Login" layout="vertical">
          <Input id="login" type="text" placeholder="Login" required />
        </Form.Item>

        <Form.Item name="email" label="Email" layout="vertical">
          <Input id="email" type="email" placeholder="Email" required />
        </Form.Item>

        <Form.Item name="phone" label="Phone" layout="vertical">
          <Input id="phone" type="tel" placeholder="Phone" required />
        </Form.Item>
        <div className={cls.profileModalActions}>
          <Form.Item className={cls.profileModalButton}>
            <Button type="primary" htmlType="submit">
              Edit Profile
            </Button>
          </Form.Item>

          <Form.Item className={cls.profileModalButton}>
            <Button type="link">Change Password</Button>
          </Form.Item>

          <Form.Item className={cls.profileModalButton}>
            <Button type="link">Change Avatar</Button>
          </Form.Item>
        </div>
      </Form>
    </ModalComponent>
  )
}
