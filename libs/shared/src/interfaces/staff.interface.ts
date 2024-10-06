export interface IStaff {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profilePicture?: string;
    address?: string;
    position: string;
    gender: 'Male' | 'Female' | 'Other';
    isAvailable?: boolean;
    userId: string
    }