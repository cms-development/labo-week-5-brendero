import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'split'
})

export class SplitPipe implements PipeTransform {
  transform(val: string, params: string[], before: string, after: string): string {
    const ingredientList = val[0].split(params[0]);
    let htmlList = '';
    ingredientList.forEach(element => {
      htmlList += `<${before}> ${element}</${after}>`;
    });
    return htmlList;
  }
}


@Pipe({
  name: 'trustHtml'
})

export class TrustHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(htmlString: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }
}
