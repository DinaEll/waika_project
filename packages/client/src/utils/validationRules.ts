export const enum Field {
  Login = 'login',
  Password = 'password',
  OldPassword = 'oldPassword',
  NewPassword = 'newPassword',
  FirstName = 'first_name',
  SecondName = 'second_name',
  Email = 'email',
  Phone = 'phone',
  DisplayName = 'display_name',
  Message = 'message',
}

export const validationRules = {
  [Field.FirstName]: /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/,
  [Field.SecondName]: /^[A-ZА-Я][a-zа-я-]*$/,
  [Field.Login]: /^(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,20}$/,
  [Field.DisplayName]: /\S+/,
  [Field.Email]: /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  [Field.Password]: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
  [Field.OldPassword]: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
  [Field.NewPassword]: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
  [Field.Phone]: /^\+?\d{10,15}$/,
  [Field.Message]: /\S+/,
};
