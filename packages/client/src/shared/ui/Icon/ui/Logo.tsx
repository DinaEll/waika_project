import React, { FC } from 'react'
import MainLogo from '@/shared/assets/svg/main-logo.svg'
import cls from './Logo.module.scss'

interface Props {
  size: 'Xs' | 'Sm' | 'Md' | 'Lg' | 'Xl'
}

export const Logo: FC<Props> = ({ size }) => {
  return <img src={MainLogo} alt="Mahjong" className={cls[`logo${size}`]} />
}
