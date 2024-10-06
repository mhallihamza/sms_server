export interface IAuthUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    role?: string
}