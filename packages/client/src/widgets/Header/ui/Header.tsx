import { LeftOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '@/shared/api';
import { getPageUrl } from '@/shared/config';
import { useAppDispatch } from '@/shared/store/hooks';
import { userSlice } from '@/shared/store/user/user.slice';
import cls from './Header.module.scss';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    void logOut().then(() => {
      console.log('log out');

      navigate(getPageUrl('login'));
      dispatch(userSlice.actions.clearState());
    });
  };

  return (
    <div className={cls.headerWrapper}>
      <div className={cls.headerBlock}>
        <Button
          type="text"
          icon={<LeftOutlined />}
          iconPosition="start"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>
      <div className={cls.headerBlock}>
        <NavLink to={getPageUrl('leaderboard')}>
          <Button type="link">Leaderboard</Button>
        </NavLink>
        <NavLink to={getPageUrl('game')}>
          <Button type="primary">Play</Button>
        </NavLink>
        <NavLink to={getPageUrl('forum')}>
          <Button type="link">Forum</Button>
        </NavLink>
      </div>
      <div className={cls.headerBlock}>
        <NavLink to={getPageUrl('profile')}>
          <Button type="link">Profile</Button>
        </NavLink>
        <Button
          type="text"
          icon={<PoweroffOutlined />}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};
