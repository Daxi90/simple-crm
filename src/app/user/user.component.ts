import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user: User = new User();
  allUsers: User[] = [];
  firestore: Firestore = inject(Firestore);

  unsubUsers: any;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.unsubUsers = onSnapshot(this.getUserRef(), (snapshot) => {
      this.allUsers = snapshot.docs.map(doc => User.fireStoreDocToUser(doc));
      console.log(this.allUsers);
    });
  }

  ngOnDestroy() {
    this.unsubUsers();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  getUserRef() {
    return collection(this.firestore, 'user');
  }

  getSingleUser(userId: string, docId: string) {
    return doc(collection(this.firestore, userId), docId);
  }
}
