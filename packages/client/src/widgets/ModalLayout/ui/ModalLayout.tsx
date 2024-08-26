import { Modal, ModalProps } from 'antd'
import React, { FC, PropsWithChildren } from 'react'

export const ModalLayout: FC<PropsWithChildren<ModalProps>> = ({
  children,
  ...modalProps
}) => {
  return <Modal {...modalProps}>{children}</Modal>
}
