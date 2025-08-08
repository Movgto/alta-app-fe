import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SafePipe } from '../../pipes/safe-pipe';

@Component({
  selector: 'app-document-viewer',
  imports: [    
    MatIconModule,
    MatButtonModule,
    SafePipe
  ],
  templateUrl: './document-viewer.html',
  styleUrl: './document-viewer.scss'
})
export class DocumentViewer {
  data = input.required<string>(); // base64
  mimetype = input.required<string>();
  filename = input.required<string>();
  fileUrl: SafeUrl | null = null;

  constructor(
    private sanitizer: DomSanitizer
  ) {

  }

  // ngOnDestroy(): void {
  //   if (this.fileUrl) {
  //     URL.revokeObjectURL(this.fileUrl);
  //   }
  // }

  getFileType(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'pdf';
    if (mimeType.includes('word') || mimeType.includes('excel') || mimeType.includes('powerpoint')) {
      return 'office';
    }
    return 'other';
  }

  getDataUrl(): string {
    const dataUrl = `data:${this.mimetype()};base64,${this.data()}`;

    console.log('Generated data URL:', dataUrl);
    return dataUrl;
  }  

  downloadFile(): void {
    const link = document.createElement('a');
    link.href = this.getDataUrl();
    link.download = this.filename();
    link.click();
  }
}
