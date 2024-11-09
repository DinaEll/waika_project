import { Button, Form, FormInstance, Input } from 'antd';
import { Store } from 'antd/es/form/interface';
import { FC } from 'react';
import cls from './ReplyForm.module.scss';

interface ReplyFormData {
  onFinish: (values: FormData) => void;
  form: FormInstance;
  initialValues?: Store | undefined;
  placeholder?: string;
  buttonText: string;
}

export const ReplyForm: FC<ReplyFormData> = ({
  initialValues,
  onFinish,
  form,
  placeholder,
  buttonText,
}) => {
  return (
    <Form
      className={cls.replyForm}
      layout="vertical"
      onFinish={onFinish}
      form={form}
      initialValues={initialValues}
    >
      <Form.Item name={'reply'}>
        <Input.TextArea id="reply" placeholder={placeholder} rows={5} />
      </Form.Item>

      <Form.Item className={cls.formFooter}>
        <Button type="primary" htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};
