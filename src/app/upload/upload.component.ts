import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { S3Service } from '../s3-service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFile: any = null;
  constructor(public s3Service: S3Service, private router: Router) {

  }
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
    else {
      this.selectedFile = null;
    }
  }

  upload(): void {
    if(this.selectedFile){
      this.s3Service.upload(this.selectedFile).subscribe(m=>{
        this.router.navigate(['/']);
      })
    }
  }
}


