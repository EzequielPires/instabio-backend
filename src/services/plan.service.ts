import { CreatePriceStripeDTO } from "src/dtos/create-price-stripe.dto";

const stripe = require('stripe')('sk_test_51JaiytFBvwMjiYE2JiSd26lbTkVXLEttaOhrrs63BTioVfZMl2mmyNDkeznKdUiL9W0qFqDHEQXSNpgZo3mWOgSH002GRGaisL');

export class PlanService {
    constructor() { }

    /* Products */

    async createProduct(name: string) {
        try {
            const product = await stripe.products.create({
                name,
            });

            return {
                success: true,
                data: product,
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async listAllProducts() {
        try {
            const products = await stripe.products.list({
                limit: 3
            });
            return {
                success: true,
                data: products.data
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async deleteProduct(id: string) {
        try {
            const deleted = await stripe.products.del(
                id
            );
            return {
                success: true,
                deleted 
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    /* Prices */

    async createPrice(body: CreatePriceStripeDTO) {
        try {
            const price = await stripe.prices.create(body);
            return {
                success: true,
                data: price
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async listAllPrices() {
        try {
            const prices = await stripe.prices.list({
                limit: 3
            })  
            return {
                success: true,
                data: prices.data,
            }          
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
    
    async createCheckoutSession(id: string) {
        const prices = await stripe.prices.list({
            expand: ['data.product'],
          });
          const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
              {
                price: "price_1LIFKiFBvwMjiYE2YIPNLivm",
                // For metered billing, do not pass quantity
                quantity: 1,
        
              },
            ],
            mode: 'subscription',
            success_url: `http://localhost:3001/?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3001?canceled=true`,
          });
        
          return {
            url: session.url
          } 
    }

}