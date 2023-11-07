import { commands } from './commands';

export class Lower extends commands{
    constructor(){
        super("Lower");
    }
    
     execute(phrase: string): boolean {
         return phrase === phrase.toLowerCase()
}
}
