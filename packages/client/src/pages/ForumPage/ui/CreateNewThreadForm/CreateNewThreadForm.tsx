import { Button, Form, Input, Space } from 'antd';
import { FC } from 'react';
import {
  ForumPageStages,
  initialNewThreadFormData,
  newThreadFormData,
} from '../../model/forumData';
import cls from './CreateNewThreadForm.module.scss';

type Props = {
  changeStage: (stage: ForumPageStages) => void;
};

export const CreateNewThreadForm: FC<Props> = ({ changeStage }) => {
  const [form] = Form.useForm();

  const handleCreateThread = (values: newThreadFormData) => {
    console.log('Success:', values);
    console.log(form.getFieldsValue());
  };

  const onCancelBtnClick = () => {
    form.resetFields();
    changeStage(ForumPageStages.forumTopicsList);
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleCreateThread}
      form={form}
      initialValues={initialNewThreadFormData}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Title is required!' }]}
      >
        <Input id="title" type="text" placeholder="Title" />
      </Form.Item>
      <Form.Item
        name={'descr'}
        label="Description"
        rules={[{ required: true, message: 'Description is required!' }]}
      >
        <Input.TextArea id="descr" placeholder="Description" rows={4} />
      </Form.Item>

      <Form.Item className={cls.footer}>
        <Space>
          <Button htmlType="reset" onClick={onCancelBtnClick}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
