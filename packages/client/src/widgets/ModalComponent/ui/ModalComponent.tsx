import { Modal, ModalProps } from 'antd'
import { ReactNode } from 'react'
import cls from './ModalComponent.modal.scss'

interface ModalPropsType {
  children?: ReactNode
  withoutBackground?: boolean
}

export const ModalComponent = ({
  children,
  ...props
}: ModalPropsType & ModalProps) => {
  return (
    <Modal className={cls.modalComponent} {...props}>
      {children}
    </Modal>
  )
}
