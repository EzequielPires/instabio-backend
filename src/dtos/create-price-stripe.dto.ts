export class CreatePriceStripeDTO {
    unit_amount: number;
    currency: string;
    recurring: {
        interval: string
    };
    product: string;
}