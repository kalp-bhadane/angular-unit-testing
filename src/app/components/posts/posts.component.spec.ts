import { Post } from "src/app/models/post.interface"
import { PostsComponent } from "./posts.component";
import { of } from "rxjs";

describe('Posts Component', () => {
  let posts: Post[];
  let mockPostService: any;
  let postsComponent: PostsComponent;

  beforeEach(() => {
    posts = [
      {
        id: 1,
        title: 'title 1',
        body: 'body 1'
      },
      {
        id: 2,
        title: 'title 2',
        body: 'body 2'
      },
      {
        id: 3,
        title: 'title 3',
        body: 'body 3'
      }
    ];
    mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost']);
    postsComponent = new PostsComponent(mockPostService);
  });

  describe('delete', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true));
      postsComponent.posts = posts;
    })

    it('should delete the actual selected post', () => {
      postsComponent.delete(posts[1]);

      for (let post of postsComponent.posts) {
        expect(post).not.toEqual(posts[1]);
      }
    })

    it('should call the delete method in Post Service only once', () => {
      postsComponent.delete(posts[1]);
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });
  })
})