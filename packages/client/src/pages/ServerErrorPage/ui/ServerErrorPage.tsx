import { Typography } from 'antd';
import { getPageUrl } from '@/shared/config';
import { MainContainer } from '@/widgets/MainContainer';
import cls from './ServerErrorPage.module.scss';

export const ServerErrorPage = () => {
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
