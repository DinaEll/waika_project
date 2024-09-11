import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { UserAvatar } from '@/shared/ui';
import { validationRules, Field } from '@/utils/validationRules';
import { LogoWithModal } from '@/widgets';
import { AvatarChangeModal } from './AvatarChangeModal/AvatarChangeModal';
import { PasswordChangeModal } from './PasswordChangeModal/PasswordChangeModal';
import cls from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const [passwordChangeModalOpen, setPasswordChangeModalOpen] = useState(false);
  const [avatarChangeModalOpen, setAvatarChangeModalOpen] = useState(false);

  const closePasswordChangeModal = () => {
    setPasswordChangeModalOpen(false);
  };

  const closeAvatarChangeModal = () => {
    setAvatarChangeModalOpen(false);
  };

  return (
    <>
      <LogoWithModal
        title={'Your Profile'}
        width={500}
        logo={<UserAvatar className={cls.profileAvatar} />}
      >
        <Form
          layout="vertical"
          className={cls.profilePageForm}
          validateTrigger={['onBlur', 'onSubmit']}
        >
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите свое имя.',
              },
              {
                pattern: validationRules[Field.FirstName],
                message:
                  'Имя должно начинаться с заглавной буквы и содержать только буквы и тире.',
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input id="first_name" type="text" placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="second_name"
            label="Last Name"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите свою фамилию.',
              },
              {
                pattern: validationRules[Field.SecondName],
                message:
                  'Фамилия должна начинаться с заглавной буквы и содержать только буквы и тире.\n',
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input id="second_name" type="text" placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="login"
            label="Login"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите ваш логин.',
              },
              {
                pattern: validationRules[Field.Login],
                message:
                  'Логин должен иметь длину от 3 до 20 символов, состоять из букв и цифр и может включать тире или подчеркивание.',
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input id="login" type="text" placeholder="Login" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите ваш адрес электронной почты.',
              },
              {
                pattern: validationRules[Field.Email],
                message:
                  'Электронная почта должна быть действительным адресом электронной почты.',
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input id="email" type="email" placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите ваш номер телефона.',
              },
              {
                pattern: validationRules[Field.Phone],
                message:
                  'Номер телефона должен состоять из 10–15 цифр и может начинаться со знака плюс.',
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input id="phone" type="tel" placeholder="Phone" />
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
