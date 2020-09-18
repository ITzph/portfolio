import * as fromProfile from './profile.actions';

describe('loadProfiles', () => {
  it('should return an action', () => {
    expect(fromProfile.setProfile(null).type).toBe('[Profile] Set');
  });
});
