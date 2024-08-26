import React from 'react'
import cls from './LogoWithModal.module.scss'
import { Logo } from '@/shared/ui/Icon'
import { Typography } from 'antd'

export interface LogoWithModalProps {
  title: string
}

export const LogoWithModal = (props: LogoWithModalProps) => {
  return (
    <div className={cls.logoWithModalContainer}>
      <div className={cls.logoWithModalImage}>
        <Logo size="Md"></Logo>
      </div>
      <div className={cls.logoWithModalTitle}>
        <Typography.Title level={3}>{props.title}</Typography.Title>
      </div>
    </div>
  )
}
