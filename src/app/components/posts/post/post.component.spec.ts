import { Post } from "src/app/models/post.interface";
import { PostComponent } from "./post.component";
import { first } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe('Post Component', () => {
  let postCompFixture: ComponentFixture<PostComponent>;
  let component: PostComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent]
    })
    postCompFixture = TestBed.createComponent(PostComponent);
    component = postCompFixture.componentInstance;
  })

  it('should create post component using TestBed', () => {
    expect(component).toBeDefined();
  })

  it('should render the post title in the anchor tag', () => {
    let post: Post = { id: 1, title: 'title1', body: 'body1' };
    component.post = post;
    //to detect the assign values in component
    postCompFixture.detectChanges(); 
    const compElement: HTMLElement = postCompFixture.nativeElement;
    const a = compElement.querySelector('a');
    expect(a?.textContent).toContain(post.title);
  })

  
  it('should raise event when the delete post is called', () => {
    // let component: PostComponent = new PostComponent();
    let post: Post = { id: 1, title: 'title1', body: 'body1' };
    component.post = post;

    component.onDelete.pipe(first()).subscribe(selectedPost => {
      expect(selectedPost).toEqual(post);
    });

    component.onDeletePost();

  });
});
