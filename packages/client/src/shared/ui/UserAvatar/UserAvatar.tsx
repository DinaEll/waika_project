import { type ComponentProps, type FC } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import cls from './UserAvatar.module.scss';
import classnames from 'classnames';

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
