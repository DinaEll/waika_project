import { LogoWithModal } from '@/widgets';
import { Typography } from 'antd';
import { getPageUrl } from '@/shared/config/router/routerConfig';
import cls from './ServerErrorPage.module.scss';

export const ServerErrorPage = () => {
  return (
    <LogoWithModal title={'500'} width={500}>
      <Typography.Text className={cls.serverErrorPageDescription}>
        Мы уже фиксим
      </Typography.Text>
      <Typography.Link
        className={cls.serverErrorPageBackLink}
        href={getPageUrl('main')}
      >
        На главную
      </Typography.Link>
    </LogoWithModal>
  );
};
