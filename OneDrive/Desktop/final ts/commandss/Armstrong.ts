import { commands } from './commands';

export class Armstrong extends commands{

    constructor(){
        super("Palindrome");
    }
    
     execute(phrase: string): boolean {

        const number = parseInt(phrase, 10); //convert to number

        if (isNaN(number)) {
          return false; 
        }
        const numberStr = number.toString();

        // Calcthe length of the number
        const numDigits = numberStr.length;

        const sum = numberStr.split('').reduce((acc, digit) => {
            const digitNum = parseInt(digit, 10);
            return acc + Math.pow(digitNum, numDigits);
          }, 0);
        
          
          return sum === number;
        }


}