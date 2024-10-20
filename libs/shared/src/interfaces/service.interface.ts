export interface IService {
    name: string;
    description: string;
    image: string;
    isActive: boolean;
    minDuration: number;
    maxDuration: number;
    startPrice: number;
    userId: string
}