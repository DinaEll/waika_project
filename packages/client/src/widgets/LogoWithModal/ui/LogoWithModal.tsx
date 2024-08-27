import {
  isValidElement,
  type ComponentProps,
  type FC,
  type PropsWithChildren,
  type ReactElement,
} from 'react'
import { Modal, Typography } from 'antd'
import { Logo } from '@/shared/ui'
import cls from './LogoWithModal.module.scss'

type Props = {
  title: string | ReactElement
  logo?: ReactElement
} & ComponentProps<typeof Modal>

//TODO rename to ModalWithLogo
export const LogoWithModal: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  logo,
  ...modalProps
}) => {
  return (
    <Modal
      footer={null}
      mask={false}
      transitionName={''}
      {...modalProps}
      open={true}
      centered={true}
      className={cls.logoWithModal}
      closable={false}>
      <div className={cls.logoWithModalContainer}>
        <div className={cls.logoWithModalImage}>{logo ?? <Logo />}</div>
        <div className={cls.logoWithModalTitle}>
          {isValidElement(title) ? (
            title
          ) : (
            <Typography.Title level={3}>{title}</Typography.Title>
          )}
        </div>
      </div>
      {children}
    </Modal>
  )
}
