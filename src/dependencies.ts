import * as AWS from "aws-sdk";
import { EmailService } from "./services/email-service";
import { getAwsConfig } from "./config/aws-config";

export const awsSES = new AWS.SES({ region: getAwsConfig().awsRegion });
export const emailService = new EmailService(awsSES);
