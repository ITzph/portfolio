import * as fromProfile from './profile.actions';

describe('loadProfiles', () => {
  it('should return an action', () => {
    expect(fromProfile.loadProfiles().type).toBe('[Profile] Load Profiles');
  });
});
