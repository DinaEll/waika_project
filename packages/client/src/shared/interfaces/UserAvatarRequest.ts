type FormFields = 'avatar'

export interface UserAvatarRequest extends FormData {
  append(name: FormFields, value: File): void
}
