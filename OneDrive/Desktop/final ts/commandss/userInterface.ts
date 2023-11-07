import { commands } from './commands';
import * as readline from 'readline';
import {  Palindrome, Lower, Digits, Armstrong } from './commands';


export class userInterface{
    constructor() {
      }

      

  showAvailableCommands() {
    const availableCommands = [
        "1- Palindrome - Check if the input is a palindrome",
        "2- Lower - Check if all characters in the input are lowercase",
        "3- Digits - Check if all characters in the input are digits",
        "4- Armstrong - Check if the input is an 'Armstrong Number'",
        "5- Nationalize - Check the nationality probability of a given first name",
        "6- Exit - Exit the application"
      ];
      console.log("Available Commands:");
    availableCommands.forEach((command, index) => {
      console.log(`${index + 1}. ${command}`);
    });
  
  }

  askUserForCommand(): Promise<number> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise<number>((resolve) => {
      rl.question('Enter the number of the command you want to execute: ', (commandNumber) => {
        rl.close();
        const parsedCommandNumber = parseInt(commandNumber, 10);

        if (!isNaN(parsedCommandNumber)) {
          resolve(parsedCommandNumber);
        } else {
          console.log('Invalid input. Please enter a valid command number.');
          resolve(this.askUserForCommand());
        }
      });
    });
  }


  askUserForInput(command: commands): Promise<string> {
    
          const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
    
        return new Promise<string>((resolve) => {
          rl.question(`Enter input for the "${command.get_name()}" command: `, (userInput) => {
            rl.close();
            resolve(userInput);
          });
        });
      }
  

  executeCommand(command: commands, input: string) {
    const result = command.execute(input);

    if (typeof result === 'boolean') {
        if (result) {
          return 'true';
        } else {
          return 'false';
        }

    } else {
        if (typeof result === 'string') {
          return result;
      } 
        return 'Unexpected result.';
      }
    }

    async run() {
      this.showAvailableCommands();
      const commandNumber = await this.askUserForCommand();
    
      let selectedCommand: commands | null = null;
    
      switch (commandNumber) {
        case 1:
          selectedCommand = new Palindrome();
          break;
        case 2:
          selectedCommand = new Lower();
          break;
        case 3:
          selectedCommand = new Digits();
          break;
        case 4:
          selectedCommand = new Armstrong();
          break;
      
        default:
          console.log('Invalid command number.');
          return;
      }
    
      if (selectedCommand) {
        const userInput = await this.askUserForInput(selectedCommand);
        const result = this.executeCommand(selectedCommand, userInput);
    
        console.log(`Result: ${result}`);
      } else {
        console.log('Invalid command number.');
      }
    }
    
}

const uI = new userInterface();

(async () => {
  await uI.run();
})();
