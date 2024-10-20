export interface ITreatment {
    name: string;
    description: string;
    image: string;
    price: number;
    isActive: boolean;
    duration: number;
    serviceId: string;
    userId: string
}