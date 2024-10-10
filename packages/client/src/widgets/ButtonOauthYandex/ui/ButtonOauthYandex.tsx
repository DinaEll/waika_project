import { Button } from 'antd';
import { useState, type FC } from 'react';
import { getServiceIdOauthYandex } from '@/shared/api';
import { getOauthRedirectUrl, getYandexUrl } from '@/shared/config';
import { isDefined, showMessage, showErrorMessage } from '@/shared/utils';

interface Props {
  title: string;
}

export const ButtonOauthYandex: FC<Props> = ({ title }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const redirectUri = getOauthRedirectUrl();
      const { service_id } = await getServiceIdOauthYandex({
        redirect_uri: redirectUri,
      });

      if (isDefined(service_id)) {
        window.location.href = getYandexUrl({
          clientId: service_id,
          redirectUrl: redirectUri,
        });
      } else {
        showMessage({
          title: 'An error occurred',
          content: 'Server is unavailable, try again later...',
        });
      }
    } catch (error) {
      showErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={() => {
        void onClick();
      }}
      loading={isLoading}
    >
      {title}
    </Button>
  );
};
