import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ZodPiPe implements PipeTransform {
  constructor(private readonly schema: any) {}
  transform(values: any) {
    function cleanValues(values) {
      Object.keys(values).forEach((key) => {
        if (values[key] === '') {
          values[key] = null;
        } else if (typeof values[key] === 'string') {
          values[key] = values[key].trim();
        } else if (typeof values[key] === 'object' && values[key] !== null) {
          cleanValues(values[key]);
        }
      });
    }

    cleanValues(values);

    const filteredValue = this.schema.parse(values);

    return filteredValue;
  }
}
