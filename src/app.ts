import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ContactFormDto } from "./dto/contact-form-dto";
import { HttpStatusCodes } from "./types/http-status-codes";
import { RequestBodyError, EmailSendError } from "./errors/errors";
import { EmailDto } from "./dto/email-dto";
import { emailService } from "./dependencies";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      throw new RequestBodyError();
    }

    const contactFormDto: ContactFormDto = JSON.parse(event.body);
    const emailResult: EmailDto = await emailService.sendContactEmails(
      contactFormDto
    );

    return {
      statusCode: HttpStatusCodes.OK,
      body: JSON.stringify(emailResult.message),
    };
  } catch (error) {
    if (error instanceof EmailSendError || error instanceof RequestBodyError) {
      return {
        statusCode: HttpStatusCodes.InternalServerError,
        body: JSON.stringify(`Error: ${(error as Error).message}`),
      };
    } else {
      return {
        statusCode: HttpStatusCodes.BadRequest,
        body: JSON.stringify(`Error: ${(error as Error).message}`),
      };
    }
  }
};

//sam local invoke MySESFunction -e event.json
