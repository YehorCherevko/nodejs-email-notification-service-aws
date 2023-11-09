export class RequestBodyError extends Error {
  constructor() {
    super("Request body is empty");
    this.name = "Request body error";
  }
}

export class EmailSendError extends Error {
  constructor(message: string) {
    super(`Error sending email: ${message}`);
    this.name = "Email send error";
  }
}
