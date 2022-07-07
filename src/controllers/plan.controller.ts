import { Body, Controller, Delete, Get, Param, Post, Res } from "@nestjs/common";
import { CreatePriceStripeDTO } from "src/dtos/create-price-stripe.dto";
import { PlanService } from "src/services/plan.service";

@Controller('plan')
export class PlanController {
    constructor(private readonly service: PlanService) {}

    /* Products */

    @Post('products/new')
    createProduct(@Body() body) {
        return this.service.createProduct(body.name);
    }

    @Get('products/list')
    listProducts() {
        return this.service.listAllProducts();
    }
    @Delete('products/delete/:id')
    deleteProduct(@Param('id') id: string) {
        return this.service.deleteProduct(id);
    }

    /* Prices */
    @Post('prices/new')
    createPrice(@Body() body: CreatePriceStripeDTO) {
        return this.service.createPrice(body);
    }

    @Get('prices/list')
    listPrices() {
        return this.service.listAllPrices();
    }
    
    @Post('create-checkout-session')
    async createCheckoutSession(@Body() body, @Res() res){
        const {url} = await this.service.createCheckoutSession(body.id);
        return res.redirect(url);
    }
}