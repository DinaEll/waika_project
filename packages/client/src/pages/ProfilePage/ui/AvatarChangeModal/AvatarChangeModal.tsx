import { Modal, ModalProps, Upload, Image } from 'antd'
import Title from 'antd/lib/typography/Title'
import cls from './AvatarChangeModal.module.scss'
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/es/upload/interface'

export const AvatarChangeModal = ({ ...props }: ModalProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [file, setFile] = useState<File>()

  const getBase64 = (file: RcFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })

  const beforeUpload = async (
    file: RcFile & { url: string; preview: string }
  ) => {
    console.log('handlePreview', file)
    setFile(file)
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file)) as string
    }
    setPreviewImage(file.url || file.preview)
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

  const UploadButton = () => (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button">
      <PlusOutlined />
      Upload
    </button>
  )

  return (
    <Modal
      title={<Title level={5}>Change Avatar</Title>}
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
        beforeUpload={file => {
          beforeUpload(file as RcFile & { url: string; preview: string })
          return false
        }}
        onRemove={() => setPreviewImage('')}>
        {previewImage.length ? null : <UploadButton />}
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
