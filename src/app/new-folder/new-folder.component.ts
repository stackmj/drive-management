import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { S3Service } from '../s3-service';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.css']
})
export class NewFolderComponent implements OnInit {
  folderForm: FormGroup = this.formBuilder.group({
    folderName: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, public s3Service: S3Service, private router: Router) {

  }
  ngOnInit(): void {

  }

  onSubmit(): void {
    this.s3Service.createFolder(this.folderForm.controls['folderName'].value).subscribe(m=>{
      this.router.navigate(['/']);
    });
  }
}
