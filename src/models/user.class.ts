export class User{
    id?: string;
    firstName: String;
    lastName: String;
    email: String;
    birthDate: Number;
    street: String;
    zipCode: number;
    city: string;
    
    constructor(obj?: any){
        this.id = obj?.id;
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }

    public toJSON(){
        return{
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
        }
    }

    public saveToJSON(){
        return{
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
        }
    }

    static fireStoreDocToUser(doc: any): User {
        return new User({
          ...doc.data(),
          id: doc.id // Nehme an, doc ist das Firestore-Dokument

        });
      }
}