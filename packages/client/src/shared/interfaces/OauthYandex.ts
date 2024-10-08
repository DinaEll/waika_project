export interface SignInOauthYandexRequest {
  code: string;
  redirect_uri: string;
}

export interface GetServiceIdOauthYandexRequest {
  redirect_uri: string;
}

export interface GetServiceIdOauthYandexResponse {
  service_id: string | undefined | null;
}
