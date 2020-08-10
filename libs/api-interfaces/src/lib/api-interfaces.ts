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
  experiences: IUserExperience[];
  certifications: IUserCertification[];
  socialHandlers: ISocialHandler[];
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

export interface IUserCertification {
  id: number;
  name: string;
  description: string;
  provider: string;
  dateAcquired: Date;
  url: string;
}

export interface ISocialHandler {
  url: string;
  name: string;
  description: string;
}
