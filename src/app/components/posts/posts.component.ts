import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Post } from 'src/app/models/post.interface';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  subscriber = new Subscriber();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.subscriber.add(this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    }));
  }

  delete(deletePost: Post) {
    this.posts = this.posts.filter(post => post.id !== deletePost.id);
    this.subscriber.add(this.postService.deletePost(deletePost).subscribe());
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
