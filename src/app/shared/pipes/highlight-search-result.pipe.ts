import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hightLight'
})

export class HighlightSearchResultPipe implements PipeTransform {
  transform(value: any, searchValue: string): any {
    if (!searchValue) {
      return value;
    }
    const regexMatching = new RegExp(searchValue, 'gi');
    return value.replace(regexMatching,  "<strong>$&</strong>");
  }
}