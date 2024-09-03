import cls from './NotFoundPage.module.scss';
import { LogoWithModal } from '@/widgets';
import { Typography } from 'antd';
import { getPageUrl } from '@/shared/config/router/routerConfig';

export const NotFoundPage = () => {
  return (
    <LogoWithModal title={'404'} width={500}>
      <Typography.Text className={cls.notFoundPageDescription}>
        Не туда попали
      </Typography.Text>
      <Typography.Link
        className={cls.notFoundPageBackLink}
        href={getPageUrl('main')}
      >
        На главную
      </Typography.Link>
    </LogoWithModal>
  );
};
