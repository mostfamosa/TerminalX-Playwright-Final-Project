import { commands } from './commands';
import axios from 'axios';
import * as fs from 'fs';


export class Nationalize extends commands {
    constructor() {
      super("Nationalize");
      this.loadCountryMapping();
    }
  
    async execute(namee: string): Promise<string | null> {
      try {
        const response = await axios.get(`https://api.nationalize.io?name=${namee}`);
        const data = response.data;
  
        if (data.country.length > 0) {
          const most_probableNationality = data.country[0];
          const countryCode = most_probableNationality.country_id;
          const probability = most_probableNationality.probability;
  
          const countryName = this.countryCodeToName(countryCode);
  
          // Print the result in the desired format
          return `${countryName} ${probability.toFixed(1)}%`;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    }
  
    private countryCodeToName(countryCode: string): string {
        // Use the loaded country mapping data
        const countryName = this.countryMapping![countryCode];
        return countryName || countryCode;
      }
      
  
    private countryMapping: { [key: string]: string } | null = null;
  
    private loadCountryMapping(): void {
      try {
        const data = fs.readFileSync('country-codes.json', 'utf-8');
        this.countryMapping = JSON.parse(data); 
      } catch (error) {
        console.error('Error reading JSON file:', error);
      }
    }
  }