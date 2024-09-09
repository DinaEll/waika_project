import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { appConfig } from '@/shared/config';
import { useAppSelector } from '@/shared/store/redux';
import { UserAvatar } from '@/shared/ui';
import { LogoWithModal } from '@/widgets';
import { AvatarChangeModal } from './AvatarChangeModal/AvatarChangeModal';
import { PasswordChangeModal } from './PasswordChangeModal/PasswordChangeModal';
import cls from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const [form] = Form.useForm();
  const [passwordChangeModalOpen, setPasswordChangeModalOpen] = useState(false);
  const [avatarChangeModalOpen, setAvatarChangeModalOpen] = useState(false);
  const { data } = useAppSelector((state) => state.user);

  const closePasswordChangeModal = () => {
    setPasswordChangeModalOpen(false);
  };

  const closeAvatarChangeModal = () => {
    setAvatarChangeModalOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  return (
    <>
      <LogoWithModal
        title={'Your Profile'}
        width={500}
        logo={
          <UserAvatar
            className={cls.profileAvatar}
            src={`${appConfig.baseUrl}/resources${data.avatar}` || ''}
          />
        }
      >
        <Form form={form} layout="vertical" className={cls.profilePageForm}>
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
                onClick={() => setPasswordChangeModalOpen(true)}
              >
                Change Password
              </Button>
            </Form.Item>

            <Form.Item className={cls.profileModalButton}>
              <Button
                type="link"
                onClick={() => setAvatarChangeModalOpen(true)}
              >
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
  );
};
