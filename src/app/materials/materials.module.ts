import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

const bookmaterialModules = [
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatInputModule,
  MatButtonModule,
  MatRadioModule,
  MatSelectModule
]

@NgModule({
  imports: [ bookmaterialModules ],
  exports: [ bookmaterialModules ]
})
export class MaterialsModule { }

