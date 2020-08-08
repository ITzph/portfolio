export interface Message {
  message: string;
}
export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  isActive: boolean;
  greetings: string[];
  imageUrl: string;
  currentRole: string;
  currentCompany: string;
}
