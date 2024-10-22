import { Flex } from 'antd';
import { type PropsWithChildren, type FC } from 'react';
import cls from './CenteredOfPage.module.scss';

export const CenteredOfPage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex className={cls.container} justify="center" align="center">
      {children}
    </Flex>
  );
};
