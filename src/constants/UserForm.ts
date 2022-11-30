export enum UserProfileFields {
  name = 'name',
  login = 'login',
  password = 'password',
}

export const userForm = {
  [UserProfileFields.name]: { required: true, minLength: 5, title: 'Name' },
  [UserProfileFields.login]: { required: true, minLength: 5, title: 'Login' },
  [UserProfileFields.password]: { required: true, minLength: 5, title: 'Password' },
};
