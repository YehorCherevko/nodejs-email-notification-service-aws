import * as dotenv from "dotenv";

dotenv.config();

interface AppConfig {
  awsRegion: string;
  adminEmail: string;
  senderEmail: string;
}

const awsConfig: AppConfig = {
  awsRegion: process.env.MY_AWS_REGION || "",
  adminEmail: process.env.ADMIN_EMAIL || "",
  senderEmail: "", //to be obtained from the contact form
};
export function getAwsConfig(): AppConfig {
  return awsConfig;
}
