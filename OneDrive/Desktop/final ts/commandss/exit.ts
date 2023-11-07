import { commands } from './commands';

export class exits extends commands{
    constructor(shouldExit: boolean) {
        super("Exit");
        this.shouldExit = shouldExit;
    }
  
    shouldExit: boolean;
  
    execute(input: string): boolean {
      this.shouldExit = true;
        
        return true;
      }

    }
      