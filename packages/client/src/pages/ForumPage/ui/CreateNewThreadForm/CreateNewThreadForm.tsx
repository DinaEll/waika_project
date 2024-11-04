import { Button, Form, Input, Space } from 'antd';
import { FC } from 'react';
import { createTopic } from '@/shared/api/forum/createTopic';
import { CreateTopicReq } from '@/shared/interfaces/ForumResponse';
import { useAppSelector } from '@/shared/store/hooks';
import { userSelector } from '@/shared/store/user/user.selector';
import {
  ForumPageStages,
  initialNewThreadFormData,
  newThreadFormData,
} from '../../model/forumData';
import cls from './CreateNewThreadForm.module.scss';

interface Props {
  changeStage: (stage: ForumPageStages) => void;
}

export const CreateNewThreadForm: FC<Props> = ({ changeStage }) => {
  const [form] = Form.useForm();
  const user = useAppSelector(userSelector);

  const handleCreateThread = async (values: newThreadFormData) => {
    if (!user) {
      return;
    }
    const topicData: CreateTopicReq = {
      user_id: user?.id,
      title: values.title,
      content: values.descr,
      views: 0,
    };
    try {
      await createTopic(topicData);
      changeStage(ForumPageStages.forumTopicsList);
    } catch (error) {
      console.error(error);
    }
  };

  const onCancelBtnClick = () => {
    form.resetFields();
    changeStage(ForumPageStages.forumTopicsList);
  };

  return (
    <Form
      layout="vertical"
      onFinish={(values: newThreadFormData) => void handleCreateThread(values)}
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
