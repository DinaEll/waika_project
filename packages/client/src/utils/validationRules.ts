export enum Fields {
  LOGIN = 'login',
  PASSWORD = 'password',
  OLD_PASSWORD = 'oldPassword',
  NEW_PASSWORD = 'newPassword',
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
  EMAIL = 'email',
  PHONE = 'phone',
  DISPLAY_NAME = 'display_name',
  MESSAGE = 'message',
}

export const validationRules = {
  [Fields.FIRST_NAME]: /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/,
  [Fields.SECOND_NAME]: /^[A-ZА-Я][a-zа-я-]*$/,
  [Fields.LOGIN]: /^(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,20}$/,
  [Fields.DISPLAY_NAME]: /\S+/,
  [Fields.EMAIL]: /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  [Fields.PASSWORD]: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
  [Fields.OLD_PASSWORD]: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
  [Fields.NEW_PASSWORD]: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
  [Fields.PHONE]: /^\+?\d{10,15}$/,
  [Fields.MESSAGE]: /\S+/,
};
