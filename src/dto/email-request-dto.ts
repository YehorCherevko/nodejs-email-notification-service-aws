export class EmailRequestDto {
  constructor(
    public Source: string,
    public Destination: { ToAddresses: string[] },
    public Message: {
      Body: {
        Text: {
          Data: string;
        };
      };
      Subject: {
        Data: string;
      };
    }
  ) {}
}
