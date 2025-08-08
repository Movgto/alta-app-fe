import { AfterViewInit, ChangeDetectorRef, Component, input, OnInit, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMarkSolid, heroDocumentArrowUpSolid } from '@ng-icons/heroicons/solid'
import { Subject } from 'rxjs';

export interface UploadDocData {selectedFile: File|null, selectedFileName: string|null}

@Component({
  selector: 'app-upload-doc-button',
  imports: [
    NgIcon,
    MatIconModule,
    MatError,
    MatButtonModule
  ],
  templateUrl: './upload-doc-button.html',
  styleUrl: './upload-doc-button.scss',
  providers: [provideIcons({ heroDocumentArrowUpSolid, heroXMarkSolid})]
})
export class UploadDocButton implements OnInit, AfterViewInit {
  initialData = input<UploadDocData>();
  onUpload = output<UploadDocData>();
  handleSubmit = input<Subject<void>>();
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  fileError: string | null = null;
  maxFileSize = 5 * 1024 * 1024; // 5MB
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  constructor(
    private _changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {    
    this.handleSubmit()?.subscribe(() => {
      if (!this.selectedFileName) {
        this.fileError = 'Debe seleccionar un documento.'
      }
    })
  }

  ngAfterViewInit(): void {
    if (this.initialData()) {
      this.selectedFile = this.initialData()!.selectedFile;
      this.selectedFileName = this.initialData()!.selectedFileName;

      console.log('Initial data received:', this.selectedFile, this.selectedFileName);
      this._changeDetector.detectChanges();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate file type
      if (!this.allowedTypes.includes(file.type)) {
        this.clearFile();
        this.fileError = 'Tipo de archivo no permitido. Solo se permiten imágenes, PDF y documentos Word.';
        return;
      }

      // Validate file size
      if (file.size > this.maxFileSize) {
        console.warn('File size exceeds limit:', file.size);
        this.clearFile();
        this.fileError = 'El archivo es demasiado grande. Máximo 5MB.';
        return;
      }

      console.log('File selected:', file.name);
      this.selectedFile = file;
      this.selectedFileName = file.name;      

      this.onUpload.emit({
        selectedFile: this.selectedFile,
        selectedFileName: this.selectedFileName
      })

      this.fileError = null;
      this._changeDetector.detectChanges();
    }
  }

  removeFile(): void {
    this.clearFile();
  }

  private clearFile(): void {
    this.selectedFile = null;
    this.selectedFileName = null;
    this.fileError = null;

    this.onUpload.emit({
      selectedFile: null,
      selectedFileName: null
    })

    this._changeDetector.detectChanges();
  }
}
