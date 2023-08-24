import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormats'
})
export class NumberFormatsPipe implements PipeTransform {
    transform(value: number | null | undefined): string {
        if (value === null || value === undefined) {
          return 'N/A';
        }
    const binary = value.toString(2);
    const hexadecimal = value.toString(16).toUpperCase();
    const octal = value.toString(8);
    
    return `Binary: ${binary}\nHexadecimal: ${hexadecimal}\nOctal: ${octal}`;
  }
}
