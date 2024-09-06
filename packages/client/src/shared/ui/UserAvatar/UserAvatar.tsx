import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import classnames from 'classnames';
import { type ComponentProps, type FC } from 'react';
import cls from './UserAvatar.module.scss';

type Props = Pick<ComponentProps<typeof Avatar>, 'src' | 'className'>;

export const UserAvatar: FC<Props> = ({ src, className }) => {
  return (
    <Avatar
      className={classnames(cls.fullWidth, className)}
      icon={<UserOutlined />}
      src={src}
    />
  );
};
