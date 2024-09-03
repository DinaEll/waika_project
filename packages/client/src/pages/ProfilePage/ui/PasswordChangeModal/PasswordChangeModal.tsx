import { Form, Input, Modal, ModalProps } from 'antd';
import cls from './PasswordChangeModal.module.scss';
import React, { ChangeEvent, FC, useState } from 'react';

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
    /*
    TODO: пока заглушка для запроса, так как еще не реализована авторизация и запросы будут падать без токена,
          во 2 спринте вынесем общую логику отправки запроса
    */
    fetch('https://ya-praktikum.tech/api/v2/user/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));

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
