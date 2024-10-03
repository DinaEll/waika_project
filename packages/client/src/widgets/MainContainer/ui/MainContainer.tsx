import { Typography } from 'antd';
import {
  isValidElement,
  type FC,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import { Logo } from '@/shared/ui';
import cls from './MainContainer.module.scss';

interface Props {
  title: string | ReactElement;
  logo?: ReactElement;
  width?: number;
}

export const MainContainer: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  logo,
  width = 500,
  ...modalProps
}) => {
  return (
    <div
      className={cls.mainContainer}
      style={{ width }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...modalProps}
    >
      <header className={cls.mainContainerHeader}>
        <div className={cls.mainContainerImage}>{logo ?? <Logo />}</div>
        {isValidElement(title) ? (
          title
        ) : (
          <Typography.Title level={3} className={cls.noMargin}>
            {title}
          </Typography.Title>
        )}
      </header>
      {children}
    </div>
  );
};
