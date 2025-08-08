import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, mimeType: string): any {
    if (!value) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:${mimeType};base64,${value}`);
  }

}
