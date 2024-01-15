export type RegisterFormFieldType =
    | 'firstname'
    | 'lastname'
    | 'username'
    | 'password'
    | 'confirmPassword';

export type RegisterGenderType = 'Male' | 'Female';

export type RegisterFormDataType = {
    firstname?: string;
    lastname?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    gender?: RegisterGenderType;
};
