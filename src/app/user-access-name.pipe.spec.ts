import { UserAccessNamePipe } from './user-access-name.pipe';

describe('UserAccessNamePipe', () => {
  it('create an instance', () => {
    const pipe = new UserAccessNamePipe();
    expect(pipe).toBeTruthy();
  });
});
