import { EventEmitter, Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

/*
export const environment = {
    aws: {
        accessKeyId: 'AWS_ACCESS_KEY',
        secretAccessKey: 'AWS_SECRET_KEY',
        region: 'us-east-1'
    }
}
*/

const bucket = new S3(environment.aws);

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  bucketName: string = 'drive-management'
  loader: EventEmitter<boolean> = new EventEmitter<boolean>()
  currentFolder: string = '';

  constructor() { }

  getFolderContent(): Observable<any> {
    return new Observable((observer) => {
      this.loader.next(true);
      bucket.listObjectsV2({ Bucket: this.bucketName, Prefix: this.currentFolder, Delimiter: '/' }, (err: AWS.AWSError, data: S3.ListObjectsV2Output) => {
        this.loader.next(false);
        console.log(data)
        if (err) {
          observer.error(err);
        }
        else {
          let list: any[] = [];
          list = list.concat(data.CommonPrefixes?.map(m => { return { name: m.Prefix, contentType: 'folder' } }));
          list = list.concat(data.Contents?.filter(m => m.Key != this.currentFolder).map(m => { return { name: m.Key, contentType: 'file', modifiedTime: m.LastModified?.toDateString() } }));
          observer.next(list);
        }

      });
    })

  }

  getUrl(key:string): Observable<any> {
    return new Observable((observer) => {
      this.loader.next(true);
      bucket.getSignedUrl('getObject',{ Bucket: this.bucketName, Key:key,Expires:60*5 }, (err: Error, url: string) => {
        this.loader.next(false);
        if (err) {
          observer.error(err);
        }
        else {
          observer.next(url);
        }

      });
    })

  }

  createFolder(folderName:string): Observable<any> {
    return new Observable((observer) => {
      this.loader.next(true);
      bucket.putObject({ Bucket: this.bucketName, Key:this.currentFolder+folderName+'/' }, (err: AWS.AWSError, data: S3.PutObjectOutput) => {
        this.loader.next(false);
        if (err) {
          observer.error(err);
        }
        else {
          observer.next(data);
        }
      });
    })

  }

  upload(file:any): Observable<any> {
    return new Observable((observer) => {
      this.loader.next(true);
      bucket.upload({ Bucket: this.bucketName, Key:this.currentFolder+file.name,Body:file }, (err: Error, data: S3.ManagedUpload.SendData) => {
        this.loader.next(false);
        if (err) {
          observer.error(err);
        }
        else {
          observer.next(data);
        }
      });
    })

  }
  
}
