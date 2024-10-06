export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    profilePicture?: string;
    role?: string
}