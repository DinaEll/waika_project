import { Typography } from 'antd';
import { getPageUrl } from '@/shared/config';
import { usePage } from '@/shared/hooks/usePage';
import { initPageBase } from '@/utils/initPageFunctions/initPageBase';
import { MainContainer } from '@/widgets/MainContainer';
import cls from './ServerErrorPage.module.scss';

export const ServerErrorPage = () => {
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
