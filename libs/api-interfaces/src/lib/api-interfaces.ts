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
  skills: IUserSkill[];
}

export interface IUserSkill {
  id: number;
  name: string;
  category: string;
  isCurrent: boolean;
}

export interface IUserExperience {
  id: number;
  name: string;
  role: string;
  startDate: Date;
  endDate: Date;
  events: string[];
}
