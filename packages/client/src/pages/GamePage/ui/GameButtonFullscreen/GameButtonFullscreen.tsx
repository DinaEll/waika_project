import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';
import { useFullscreen } from '@/shared/hooks';

export const GameButtonFullscreen: FC = () => {
  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();

  const onClick = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen(document.body);
    }
  };

  const icon = isFullscreen ? (
    <FullscreenExitOutlined />
  ) : (
    <FullscreenOutlined />
  );

  return <Button onClick={onClick} icon={icon} />;
};
