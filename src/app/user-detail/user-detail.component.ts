import { Component, inject, OnInit } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  route = inject(ActivatedRoute);

  userId: string = '';
  user: User | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.userId = id;
        this.getSingleUser(this.userId);
      } else {
        console.log('ID is not available');
      }
    });
  }

  async getSingleUser(docId: string) {
    const docRef = doc(this.firestore, 'user', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.user = docSnap.data() as User; // Stelle sicher, dass deine User-Klasse den Daten in Firestore entspricht
    } else {
      console.log('No such document!');
    }
  }
}
