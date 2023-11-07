import { commands } from './commands';

export class Digits extends commands{
    constructor(){
        super("Digits");
    }
    
     execute(phrase: string): boolean {
        const isAllDigits = /^\d+$/.test(phrase);

        return isAllDigits;
     }
}
