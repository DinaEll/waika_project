import { Modal, ModalProps } from 'antd'
import React from 'react'

export interface ModalLayoutProps {
  children: React.ReactNode
  modalProps: ModalProps
}

export const ModalLayout = (props: ModalLayoutProps) => {
  return <Modal {...props.modalProps}>{props.children}</Modal>
}
