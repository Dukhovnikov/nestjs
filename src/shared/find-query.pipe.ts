import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FindQueryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    let options = {};
    for (const key of Object.keys(value)) {
      const elements = key.split('_');

      if (elements[0].length) {
        const k = elements.pop();

        if (elements.length === 0) {
          options = { ...options, ...{ [k]: value[key] } };
        } else {
          options = {
            ...options,
            ...this.buildParams(value[key], k, elements),
          };
        }
      }
    }

    return { ...value, options };
  }

  buildParams(value, key, attrName) {
    if (key.startsWith('contains')) {
      return {
        [attrName]:
          key === 'contains' ? new RegExp(value, 'i') : new RegExp(value),
      };
    }
    return {
      [attrName.join('_')]: {
        [`$${key}`]: value,
      },
    };
  }
}
