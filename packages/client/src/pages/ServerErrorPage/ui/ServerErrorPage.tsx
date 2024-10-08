import { Typography } from 'antd';
import { type FC } from 'react';
import { getPageUrl } from '@/shared/config';
import { usePage } from '@/shared/hooks';
import { initPageBase } from '@/shared/utils';
import { MainContainer } from '@/widgets';
import cls from './ServerErrorPage.module.scss';

export const ServerErrorPage: FC = () => {
  usePage({ initPage: initPageBase });
  return (
    <MainContainer title={'500'}>
      <Typography.Text className={cls.serverErrorPageDescription}>
        Мы уже фиксим
      </Typography.Text>
      <Typography.Link
        className={cls.serverErrorPageBackLink}
        href={getPageUrl('main')}
      >
        На главную
      </Typography.Link>
    </MainContainer>
  );
};
