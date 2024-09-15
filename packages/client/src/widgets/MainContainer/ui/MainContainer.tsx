import { Modal, Typography } from 'antd';
import {
  isValidElement,
  type ComponentProps,
  type FC,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import { Logo } from '@/shared/ui';
import cls from './MainContainer.module.scss';

type Props = {
  title: string | ReactElement;
  logo?: ReactElement;
} & ComponentProps<typeof Modal>;

export const MainContainer: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  logo,
  ...modalProps
}) => {
  return (
    <Modal
      footer={null}
      mask={false}
      transitionName={undefined}
      closable={false}
      className={cls.mainContainer}
      open
      centered
      width={500}
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
    </Modal>
  );
};
