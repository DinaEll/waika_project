import { Typography } from 'antd';
import { type FC } from 'react';
import { getPageUrl } from '@/shared/config';
import { usePage } from '@/shared/hooks';
import { initPageBase } from '@/shared/utils';
import { MainContainer } from '@/widgets';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage: FC = () => {
  usePage({ initPage: initPageBase });
  return (
    <MainContainer title={'404'}>
      <Typography.Text className={cls.notFoundPageDescription}>
        Не туда попали
      </Typography.Text>
      <Typography.Link
        className={cls.notFoundPageBackLink}
        href={getPageUrl('main')}
      >
        На главную
      </Typography.Link>
    </MainContainer>
  );
};
