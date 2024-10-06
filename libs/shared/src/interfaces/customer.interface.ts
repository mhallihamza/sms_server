export interface ICustomer {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profilePicture?: string;
    address?: string;
    isLoyalCustomer?: boolean;
    notes?: string;
    userId: string
}