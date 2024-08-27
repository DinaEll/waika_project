import React, { FC, PropsWithChildren } from 'react'
import cls from './LogoWithModal.module.scss'
import { Logo } from '@/shared/ui/Icon'
import { Modal, ModalProps, Typography } from 'antd'

type Props = {
  title: string
} & ModalProps

export const LogoWithModal: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  ...modalProps
}) => {
  return (
    <Modal {...modalProps}>
      <div className={cls.logoWithModalContainer}>
        <div className={cls.logoWithModalImage}>
          <Logo size="Md"></Logo>
        </div>
        <div className={cls.logoWithModalTitle}>
          <Typography.Title level={3}>{title}</Typography.Title>
        </div>
      </div>
      {children}
    </Modal>
  )
}
