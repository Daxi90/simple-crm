import { Component, inject, OnInit } from '@angular/core';
import { Firestore, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);

  userId: string = '';
  user: User | undefined;
  userSubscription: any; // Speichere das Subscription-Objekt

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.userId = id;
        this.listenToUser(this.userId); // Ändere den Funktionsnamen zu listenToUser
      } else {
        console.log('ID is not available');
      }
    });
  }

  editUserDetails() {
    if (!this.user) {
      console.error('Cannot edit user details because user is undefined');
      return; // Stoppe die Funktion hier, wenn user undefined ist
    }
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.saveToJSON()); // Jetzt ist TypeScript sicher, dass this.user nicht undefined ist
  }

  editAddressDetails() {
    if (!this.user) {
      console.error('Cannot edit address details because user is undefined');
      return; // Stoppe die Funktion hier, wenn user undefined ist
    }
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.saveToJSON()); // Auch hier
  }

  listenToUser(docId: string) {
    const docRef = doc(this.firestore, 'user', docId);

    this.userSubscription = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        this.user = User.fireStoreDocToUser(docSnap);
      } else {
        console.log('No such document!');
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription(); // Beende das Abonnement, wenn die Komponente zerstört wird
    }
  }
}
