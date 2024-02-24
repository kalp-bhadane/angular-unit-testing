import { Post } from "src/app/models/post.interface"
import { PostsComponent } from "./posts.component";
import { of } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PostService } from "src/app/services/post/post.service";
import { By } from "@angular/platform-browser";
import { PostComponent } from "./post/post.component";

describe('Posts Component', () => {
  let posts: Post[];
  let mockPostService: any;
  let postsComponent: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

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
    TestBed.configureTestingModule({
      declarations: [PostsComponent, PostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService, //'useClass' for replica class and 'useValue' for mock
        },
      ],
    });

    fixture = TestBed.createComponent(PostsComponent);
    postsComponent = fixture.componentInstance;
  });

  it('should check whether exact post is sending to PostComponent', () => {
    mockPostService.getPosts.and.returnValue(of(posts));
    fixture.detectChanges();
    const postComponentDEs = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );

    for (let i = 0; i < postComponentDEs.length; i++) {
      const postComponentInstance = postComponentDEs[i]
        .componentInstance;// as PostComponent;
      expect(postComponentInstance?.post?.title).toEqual(posts[i].title);
    }
  });

  it('should set posts from the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(posts));
    fixture.detectChanges();
    expect(postsComponent.posts.length).toBe(3);
  });

  it('should create one post child Element for each post ', () => {
    mockPostService.getPosts.and.returnValue(of(posts));
    //set data by calling service method inside ngOnit
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const postsElement = debugElement.queryAll(By.css('.posts'));
    expect(postsElement.length).toBe(posts.length);
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

    it('should call delete method when post component button is clicked', () => {
      spyOn(postsComponent, 'delete');
      //initializing the child components for all posts
      mockPostService.getPosts.and.returnValue(of(posts));
      fixture.detectChanges();

      let postComponentDEs = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );

      for (let i = 0; i < postComponentDEs.length; i++) {
        postComponentDEs[i]
          .query(By.css('button'))
          .triggerEventHandler('click', { preventDefault: () => {} });
        expect(postsComponent.delete).toHaveBeenCalledWith(posts[i]);
      }
    });

    it('should call the delete method when the delete event is emitted in Post Component', () => {
      spyOn(postsComponent, 'delete');
      mockPostService.getPosts.and.returnValue(of(posts));
      fixture.detectChanges();

      let postComponentDEs = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );

      for (let i = 0; i < postComponentDEs.length; i++) {
        (postComponentDEs[i].componentInstance as PostComponent).onDelete.emit(
          posts[i]
        );
        expect(postsComponent.delete).toHaveBeenCalledWith(posts[i]);
      }
    });
  })
})