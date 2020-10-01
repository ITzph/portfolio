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
  icon: string;
  description: string;
}

export interface IImageMetadata {
  id: number;
  imageName: string;
  url?: string;
  title: string;
  description: string;
  createdAt: Date;
  tags: string[];
}

export class Pagination<PaginationObject> {
  constructor(
    /**
     * a list of items to be returned
     */
    public readonly items: PaginationObject[],
    /**
     * associated meta information (e.g., counts)
     */
    public readonly meta: IPaginationMeta,
    /**
     * associated links
     */
    public readonly links: IPaginationLinks,
  ) {}
}

export interface IPaginationOptions {
  /**
   * the amount of items to be requested per page
   */
  limit: number;
  /**
   * the page that is requested
   */
  page: number;
  /**
   * a babasesic route for generating links (i.e., WITHOUT query params)
   */
  route?: string;
}

export interface IPaginationMeta {
  /**
   * the amount of items on this specific page
   */
  itemCount: number;
  /**
   * the total amount of items
   */
  totalItems: number;
  /**
   * the amount of items that were requested per page
   */
  itemsPerPage: number;
  /**
   * the total amount of pages in this paginator
   */
  totalPages: number;
  /**
   * the current page this paginator "points" to
   */
  currentPage: number;
}

export interface IPaginationLinks {
  /**
   * a link to the "first" page
   */
  first?: string;
  /**
   * a link to the "previous" page
   */
  previous?: string;
  /**
   * a link to the "next" page
   */
  next?: string;
  /**
   * a link to the "last" page
   */
  last?: string;
}

export interface ContactMeDetails {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
