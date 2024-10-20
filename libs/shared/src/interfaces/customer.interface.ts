export interface ICustomer {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profilePicture?: string;
    address?: string;
    isLoyalCustomer: boolean;
    gender: 'Male' | 'Female' | 'Other';
    notes?: string;
    userId: string
}