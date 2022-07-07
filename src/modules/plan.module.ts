import { Module } from "@nestjs/common";
import { PlanController } from "src/controllers/plan.controller";
import { PlanService } from "src/services/plan.service";

@Module({
    imports: [],
    controllers: [PlanController],
    providers: [PlanService]
}) export class PlanModule {}