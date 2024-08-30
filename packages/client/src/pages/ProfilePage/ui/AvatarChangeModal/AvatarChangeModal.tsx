import { Modal, ModalProps, Upload, Image } from 'antd'
import type { GetProp, UploadProps } from 'antd'
import cls from './AvatarChangeModal.module.scss'
import React, { FC, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export const AvatarChangeModal: FC<ModalProps> = ({ ...props }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [file, setFile] = useState<File>()

  const getBase64 = (file: FileType) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })

  const beforeUpload = async (
    file: FileType & { url: string; preview: string }
  ) => {
    setFile(file)
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file)) as string
    }
    setPreviewImage(file.url || file.preview)
    return false
  }

  const sendNewAvatar = (e: React.MouseEvent<HTMLButtonElement>) => {
    /*
    TODO: пока заглушка для запроса, так как еще не реализована авторизация и запросы будут падать без токена,
          во 2 спринте вынесем общую логику отправки запроса
    */
    const formData = new FormData()
    formData.append('avatar', file as File)
    fetch('https://ya-praktikum.tech/api/v2/user/profile/avatar', {
      method: 'PUT',
      body: formData,
    })
      .then(res => res.json())
      .catch(err => console.error(err))

    if (props.onCancel) {
      props.onCancel(e)
    }
  }

  return (
    <Modal
      title={'Change Avatar'}
      width={500}
      classNames={{
        body: cls.avatarChangeModalContent,
      }}
      centered
      onOk={sendNewAvatar}
      {...props}>
      <Upload
        name="avatar"
        listType="picture-card"
        onPreview={() => setPreviewOpen(true)}
        beforeUpload={file =>
          beforeUpload(file as FileType & { url: string; preview: string })
        }
        onRemove={() => setPreviewImage('')}>
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
            onVisibleChange: visible => setPreviewOpen(visible),
            afterOpenChange: visible => !visible,
          }}
          src={previewImage}
        />
      )}
    </Modal>
  )
}
