import { Post } from "src/app/models/post.interface";
import { PostComponent } from "./post.component";
import { first } from "rxjs";

describe('Post Component', () => {
  it('should raise event when the delete post is called', () => {
    let component: PostComponent = new PostComponent();
    let post: Post = { id: 1, title: 'title1', body: 'body1' };
    component.post = post;

    component.onDelete.pipe(first()).subscribe(selectedPost => {
      expect(selectedPost).toEqual(post);
    });

    component.onDeletePost();

  });
});
