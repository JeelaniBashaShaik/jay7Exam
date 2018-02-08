import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,MatToolbarModule,MatCardModule,MatRadioModule,MatCheckboxModule,
    MatGridListModule,MatIconModule,MatProgressSpinnerModule,MatProgressBarModule,MatDialogModule
    ,MatSnackBarModule
  ],
  declarations: [],
  exports:[  MatButtonModule,MatToolbarModule,MatCardModule,MatRadioModule,MatCheckboxModule,
    MatGridListModule,MatIconModule,MatProgressSpinnerModule,MatProgressBarModule,MatDialogModule
    ,MatSnackBarModule]
})
export class SharedModule { }
