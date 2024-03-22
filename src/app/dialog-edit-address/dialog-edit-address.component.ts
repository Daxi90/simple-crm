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
import { Firestore, setDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormField,
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
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  dialogRef = inject(MatDialogRef<DialogEditAddressComponent>);
  firestore: Firestore = inject(Firestore);

  user: User = new User();
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
