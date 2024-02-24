import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { PostDetailComponent } from './post-detail.component';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/models/post.interface';
import { of } from 'rxjs';

describe('PostDetailComponent', () => {
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockPostService: jasmine.SpyObj<PostService>
  beforeEach(() => {
    let mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    };

    mockPostService = jasmine.createSpyObj(['getPost', 'updatePost']);
    let mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(PostDetailComponent);
  });

  it('should render the post title in h2 template', () => {
    mockPostService.getPost.and.returnValue(of({
      id: 3,
      title: 'Title 1',
      body: 'Body 1'
    } as Post))

    fixture.detectChanges();
    
    // const elenent = fixture.debugElement.query(By.css('h2')
    //.native Element as HTMLElement;
    const element = fixture.nativeElement.querySelector('h2') as HTMLElement;
    expect(element.textContent).toBe(fixture.componentInstance.post.title);
  })
});