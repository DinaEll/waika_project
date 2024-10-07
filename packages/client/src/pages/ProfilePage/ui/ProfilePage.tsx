import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { appConfig } from '@/shared/config';
import { usePage } from '@/shared/hooks/usePage';
import { useAppSelector } from '@/shared/store/hooks';
import { selectUser } from '@/shared/store/user/user.slice';
import { UserAvatar } from '@/shared/ui';
import { initPageBase } from '@/utils/initPageFunctions/initPageBase';
import { validationRules, Field } from '@/utils/validationRules';
import { MainContainer } from '@/widgets/MainContainer';
import { AvatarChangeModal } from './AvatarChangeModal/AvatarChangeModal';
import { PasswordChangeModal } from './PasswordChangeModal/PasswordChangeModal';
import cls from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const [form] = Form.useForm();
  const [passwordChangeModalOpen, setPasswordChangeModalOpen] = useState(false);
  const [avatarChangeModalOpen, setAvatarChangeModalOpen] = useState(false);
  const { data } = useAppSelector(selectUser);

  usePage({ initPage: initPageBase });

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
      <MainContainer
        title={'Your Profile'}
        logo={
          <UserAvatar
            className={cls.profileAvatar}
            src={
              data?.avatar !== null && data?.avatar !== undefined
                ? `${appConfig.baseUrl}/resources${data.avatar}`
                : ''
            }
          />
        }
      >
        <Form
          form={form}
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
                message: 'Please enter your name.',
              },
              {
                pattern: validationRules[Field.FirstName],
                message:
                  'The name must begin with a capital letter and contain only letters and dashes.',
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
                message: 'Please enter your last name.',
              },
              {
                pattern: validationRules[Field.SecondName],
                message:
                  'The last name must begin with a capital letter and contain only letters and dashes.',
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
                message: 'Please enter your login.',
              },
              {
                pattern: validationRules[Field.Login],
                message:
                  'The login must be between 3 and 20 characters long, consist of letters and numbers, and may include a dash or underscore.',
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
                message: 'Please enter your email address.',
              },
              {
                pattern: validationRules[Field.Email],
                message: 'The email must be a valid email address.',
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
                message: 'Please enter your phone number.',
              },
              {
                pattern: validationRules[Field.Phone],
                message:
                  'The phone number must be 10–15 digits long and may begin with a plus sign.',
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
      </MainContainer>
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
