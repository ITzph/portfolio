import { createAction, props } from '@ngrx/store';
import { IUser, IUserCertification, IUserExperience, IUserSkill } from '@portfolio/api-interfaces';

export enum ProfileAction {
  SetProfile = '[Profile] Set',
  UpdateProfile = '[Profile] Update',
  UpdateExperience = '[Profile] Update Experience',
  UpdateSkills = '[Profile] Update Skills',
  UpdateCertifications = '[Profile] Update Certifications',
}

export const setProfile = createAction(ProfileAction.SetProfile, props<{ profile: IUser }>());

export const updateProfile = createAction(
  ProfileAction.UpdateProfile,
  props<{ profile: Partial<IUser> }>(),
);

// TODO make this plural
export const updateExperience = createAction(
  ProfileAction.UpdateExperience,
  props<{ experiences: IUserExperience[] }>(),
);

export const updateSkills = createAction(
  ProfileAction.UpdateSkills,
  props<{ skills: IUserSkill[] }>(),
);

export const updateCertifications = createAction(
  ProfileAction.UpdateSkills,
  props<{ certifications: IUserCertification[] }>(),
);
