export type FormData = {
    firstName: string, //required
    lastName: string; //required
    email?: string;
    gender: string; //required
    userNumber?: string; // required and should be 10 Digits
    dateOfBirth?: string;
    subjects?: string[];
    hobbies?: string[];
    picture?: string;
    currentAddress?: string;
    state?: string;
    city?: string;
};