import * as fromBlogs from './blogs.actions';

describe('loadBlogss', () => {
  it('should return an action', () => {
    expect(fromBlogs.loadBlogs().type).toBe('[Blogs] Load Blogss');
  });
});
