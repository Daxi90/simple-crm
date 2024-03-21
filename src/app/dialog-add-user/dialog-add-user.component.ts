import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { Firestore, collection, doc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-add-user',
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
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>){}

  ngOnInit(){
    console.log("Funzt!");
  }


  firestore: Firestore = inject(Firestore);
  user: User = new User();
  birthDate: Date = new Date();
  loading: boolean = false;

  saveUser(){
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current User: ',this.user)
    console.log(this.getUserRef());
    this.addUserToFirestore(this.user.toJSON()).then((result:any) =>{
      console.log('Adding user finished', result);
    })
    this.loading = false;
    this.dialogRef.close();
  }

  getUserRef(){
    return collection(this.firestore, 'user');
  }

  getSingleUser(userId: string, docId: string){
    return doc(collection(this.firestore, userId), docId);
  }

  async addUserToFirestore(item: {}){
    await addDoc(this.getUserRef(), item).catch( (err) => {
      console.error(err);
    } ).then( (docRef) => {
      console.log("Document written with ID: ", docRef?.id);
    } );
  }
}
