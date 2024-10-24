import { Form, Input, Modal, ModalProps } from 'antd';
import { ChangeEvent, FC, useState } from 'react';
import { changePassword } from '@/shared/api';
import cls from './PasswordChangeModal.module.scss';

export const PasswordChangeModal: FC<ModalProps> = ({ ...props }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendNewPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    void changePassword(formData).then();

    if (props.onCancel) {
      props.onCancel(e);
    }
  };

  return (
    <Modal
      title={'Change Password'}
      width={500}
      classNames={{
        body: cls.passwordChangeModalContent,
      }}
      centered
      onOk={sendNewPassword}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Form layout="vertical">
        <Form.Item
          name="oldPassword"
          label="Current Password"
          layout="vertical"
        >
          <Input
            id="oldPassword"
            name="oldPassword"
            type="password"
            placeholder="Current Password"
            value={formData.oldPassword}
            required
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item name="newPassword" label="New Password" layout="vertical">
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
            required
            onChange={handleChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
