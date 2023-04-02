import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileListComponent } from './file-list/file-list.component';
import { NewFolderComponent } from './new-folder/new-folder.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [{
  path: '', component: FileListComponent
},
{
  path: 'upload', component: UploadComponent
},
{
  path: 'new-folder', component: NewFolderComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
