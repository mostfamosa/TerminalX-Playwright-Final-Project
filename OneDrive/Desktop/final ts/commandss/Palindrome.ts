import { commands } from './commands';

export class PalindromeCommand extends commands {
    constructor(){
        super("Palindrome");
    }
    
     execute(phrase: string): boolean {
        const original = phrase.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
        const reversed = original.split('').reverse().join('');
    
        return original === reversed
    }
}
