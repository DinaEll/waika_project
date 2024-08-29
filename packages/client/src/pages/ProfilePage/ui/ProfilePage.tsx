import { Button, Form, Input, Avatar } from 'antd'
import React, { useState } from 'react'
import cls from './ProfilePage.module.scss'
import { UserOutlined } from '@ant-design/icons'
import { PasswordChangeModal } from './PasswordChangeModal/PasswordChangeModal'
import { AvatarChangeModal } from './AvatarChangeModal/AvatarChangeModal'
import { LogoWithModal } from '@/widgets'

export const ProfilePage = () => {
  const [passwordChangeModalOpen, setPasswordChangeModalOpen] = useState(false)
  const [avatarChangeModalOpen, setAvatarChangeModalOpen] = useState(false)

  const closePasswordChangeModal = () => {
    setPasswordChangeModalOpen(false)
  }

  const closeAvatarChangeModal = () => {
    setAvatarChangeModalOpen(false)
  }

  return (
    <>
      <LogoWithModal
        title={'Your Profile'}
        width={500}
        logo={
          <Avatar
            className={cls.profileAvatar}
            size={108}
            icon={<UserOutlined style={{ fontSize: '32px' }} />}
          />
        }>
        <Form layout="vertical" className={cls.profilePageForm}>
          <Form.Item name="first_name" label="First Name" layout="vertical">
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
              <Button
                type="link"
                onClick={() => setPasswordChangeModalOpen(true)}>
                Change Password
              </Button>
            </Form.Item>

            <Form.Item className={cls.profileModalButton}>
              <Button
                type="link"
                onClick={() => setAvatarChangeModalOpen(true)}>
                Change Avatar
              </Button>
            </Form.Item>
          </div>
        </Form>
      </LogoWithModal>
      <PasswordChangeModal
        open={passwordChangeModalOpen}
        okText={'Save New Password'}
        onCancel={closePasswordChangeModal}
      />
      <AvatarChangeModal
        open={avatarChangeModalOpen}
        okText={'Save New Avatar'}
        onCancel={closeAvatarChangeModal}
      />
    </>
  )
}
