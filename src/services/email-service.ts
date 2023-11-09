import * as AWS from "aws-sdk";
import { ContactFormDto } from "../dto/contact-form-dto";
import { EmailDto } from "../dto/email-dto";
import { getAwsConfig } from "../config/aws-config";
import { EmailSendError } from "../errors/errors";
import { EmailRequestDto } from "../dto/email-request-dto";

export class EmailService {
  private ses: AWS.SES;

  constructor(ses: AWS.SES) {
    this.ses = ses;
  }

  public async sendContactEmails(
    contactFormDto: ContactFormDto
  ): Promise<EmailDto> {
    const { userQuestion, userEmail, userName } = contactFormDto;
    const { adminEmail } = getAwsConfig();

    const userMessage = `Hi, ${userName}, \n\nThank you for your question!`;
    const adminMessage = `New contact form submission from ${userName}  (${userEmail}):\n\n${userQuestion}`;

    const userRequestDto = this.createEmailParams(
      userEmail,
      userEmail,
      "Thank you for contacting us",
      userMessage
    );
    const adminRequestDto = this.createEmailParams(
      userEmail,
      adminEmail,
      "New Contact Form Submission",
      adminMessage
    );

    try {
      await Promise.all([
        this.ses.sendEmail(userRequestDto).promise(),
        this.ses.sendEmail(adminRequestDto).promise(),
      ]);
      return new EmailDto(true, "Email sent successfully");
    } catch (error) {
      throw new EmailSendError((error as Error).message);
    }
  }

  private createEmailParams(
    fromEmail: string,
    toEmail: string,
    subject: string,
    message: string
  ): EmailRequestDto {
    return new EmailRequestDto(
      fromEmail,
      { ToAddresses: [toEmail] },
      {
        Body: {
          Text: {
            Data: message,
          },
        },
        Subject: {
          Data: subject,
        },
      }
    );
  }
}
