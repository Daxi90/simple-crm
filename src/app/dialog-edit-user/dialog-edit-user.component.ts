import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  Firestore,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  dialogRef = inject(MatDialogRef<DialogEditUserComponent>);
  firestore: Firestore = inject(Firestore);

  user: User = new User();
  birthDate: Date = new Date();
  loading: boolean = false;

  saveUser() {
    console.log(this.user);
    if (this.user.id) {
      // Stelle sicher, dass `id` nicht `undefined` ist
      try {
        this.loading = true;
        this.updateUser(this.user.id, this.user).then(() => {
          this.dialogRef.close();
          this.loading = false;
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error('User ID is undefined');
      // Behandle den Fall, dass die ID undefined ist (z.B. Benutzer informieren)
    }
  }

  async updateUser(userId: string, user: User) {
    await setDoc(doc(this.firestore, 'user', userId), user.toJSON());
  }
}
