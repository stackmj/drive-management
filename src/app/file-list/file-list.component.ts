import { Component, OnInit } from '@angular/core';
import { S3Content } from '../s3-content';
import { S3Service } from '../s3-service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  contentList: S3Content[] = [];
  constructor(public s3Service: S3Service) {
  }
  ngOnInit(): void {
    this.openFolder(this.s3Service.currentFolder);
  }

  back(): void {
    //---    Document/One/Two/
    let arr = this.s3Service.currentFolder.split('/');
    arr.splice(arr.length - 2, 1);
    let folderName = arr.join('/');
    this.openFolder(folderName);
  }

  openFolder(folder: string) {
    this.s3Service.currentFolder = folder;
    this.s3Service.getFolderContent().subscribe(m => {
      this.contentList = m;
    })
  }

  viewFile(key: string) {
    this.s3Service.getUrl(key).subscribe(m => {
      window.open(m, '_blank');
    })
  }

}
