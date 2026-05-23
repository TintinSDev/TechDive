declare module "mailersend" {
  export class Recipient {
    constructor(email: string, name: string);
  }

  export class EmailParams {
    setFrom(email: string): this;
    setFromName(name: string): this;
    setRecipients(recipients: Recipient[]): this;
    setSubject(subject: string): this;
    setHtml(html: string): this;
    setText(text: string): this;
  }

  export class MailerSend {
    constructor(options: { apiKey: string });
    send(emailParams: EmailParams): Promise<any>;
  }
}
