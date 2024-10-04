import { Typography } from 'antd';
import { getPageUrl } from '@/shared/config';
import { usePage } from '@/shared/hooks/usePage';
import { initPageBase } from '@/utils/initPageFunctions/initPageBase';
import { MainContainer } from '@/widgets/MainContainer';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
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
