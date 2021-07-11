import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPage } from './project';
import { ComponentPage } from '../component/component';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ProjectPage, ComponentPage],
  entryComponents: [ComponentPage]
})
export class ProjectPageModule {}
