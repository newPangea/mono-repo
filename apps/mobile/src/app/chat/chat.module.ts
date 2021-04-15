import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [{ path: '', component: ChatComponent }];

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ],
})
export class ChatModule {}
