import { PlusOutlined } from '@ant-design/icons';
import {
  Modal,
  type ModalProps,
  Upload,
  Image,
  GetProp,
  UploadProps,
} from 'antd';
import { type FC, useState } from 'react';
import { changeAvatar } from '@/shared/api';
import { useAppDispatch } from '@/shared/store/hooks';
import { userSlice } from '@/shared/store/user/user.slice';
import cls from './AvatarChangeModal.module.scss';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const AvatarChangeModal: FC<ModalProps> = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [file, setFile] = useState<File>();
  const dispatch = useAppDispatch();

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('FileReader result is not a string.'));
        }
      };
      reader.onerror = () => {
        const message = reader.error
          ? reader.error.message
          : 'Unknown error occurred during file reading';
        reject(new Error(`FileReader error: ${message}`));
      };
    });

  const beforeUpload = async (
    file: FileType & { url: string; preview: string },
  ) => {
    setFile(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }
    setPreviewImage(file.url || file.preview);
    return false;
  };

  const sendNewAvatar = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (file) {
      void changeAvatar('avatar', file).then((res) => {
        dispatch(userSlice.actions.setAvatar(res.avatar));
        if (props.onCancel) {
          props.onCancel(e);
        }
      });
    }
  };

  return (
    <Modal
      title={'Change Avatar'}
      width={500}
      classNames={{
        body: cls.avatarChangeModalContent,
      }}
      centered
      onOk={sendNewAvatar}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Upload
        name="avatar"
        listType="picture-card"
        onPreview={() => setPreviewOpen(true)}
        beforeUpload={(file) =>
          beforeUpload(file as FileType & { url: string; preview: string })
        }
        onRemove={() => setPreviewImage('')}
      >
        {previewImage.length ? null : (
          <button className={cls.avatarChangeModalUploadBtn} type="button">
            <PlusOutlined />
            Upload
          </button>
        )}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible,
          }}
          src={previewImage}
        />
      )}
    </Modal>
  );
};
