import { commands } from './commands';


export class commandRunner{
    constructor() {
      }
    
      executeCommand(command: commands, input: string): any {
        return command.execute(input);
      }
}
