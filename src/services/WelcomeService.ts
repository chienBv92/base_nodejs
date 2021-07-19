import { injectable } from 'inversify';

@injectable()
export default class WelcomeService {
  public getWelcomeMessage(): string {
    return 'Hello, This is message from WelcomeService';
  }
}
