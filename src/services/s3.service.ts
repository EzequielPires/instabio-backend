import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service
{
    AWS_S3_BUCKET = "instabio-storage";
    s3 = new AWS.S3
    ({
        accessKeyId: "AKIAVFCGY7T7IYXSCE7U",
        secretAccessKey: "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",
    });

    async uploadFile(file, name)
    {
        console.log(file);

        await this.s3_upload(file, this.AWS_S3_BUCKET, name, file.mimetype);
    }

    async s3_upload(file, bucket, name, mimetype)
    {
        const params = 
        {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        };

        console.log(params);

        try
        {
            let s3Response = await this.s3.upload(params).promise();

            console.log(s3Response);
        }
        catch (e)
        {
            console.log(e);
        }
    }
}