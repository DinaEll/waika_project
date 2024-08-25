import React from 'react'
import cls from './Page.module.scss'

export interface PageProps {
  children: React.ReactNode
}

export const Page = (props: PageProps) => {
  return <main className={cls.pageContainer}>{props.children}</main>
}
