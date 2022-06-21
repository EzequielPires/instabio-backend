import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
    AWS_S3_BUCKET = "instabio-storage";
    s3 = new AWS.S3
        ({
            accessKeyId: "AKIAVFCGY7T7IYXSCE7U",
            secretAccessKey: "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",
        });

    async uploadFile(file, name) {
        const response = await this.s3_upload(file, this.AWS_S3_BUCKET, name, file.mimetype);

        return response.Key;
    }

    async s3_upload(file, bucket, name, mimetype) {
        const params =
        {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        };

        try {
            let s3Response = await this.s3.upload(params).promise();

            return s3Response;
        }
        catch (e) {
            console.log(e);
        }
    }

    getFileStream(fileKKey: string) {
        const downloadParams = {
            Key: fileKKey,
            Bucket: this.AWS_S3_BUCKET
        }
        return this.s3.getObject(downloadParams).createReadStream()
    } 
}