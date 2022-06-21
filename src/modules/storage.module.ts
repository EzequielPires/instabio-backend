import { Module } from "@nestjs/common";
import { StorageController } from "src/controllers/storage.controller";
import { S3Service } from "src/services/s3.service";

@Module({
    imports: [],
    controllers: [StorageController],
    providers: [S3Service],
}) export class StorageModule {}