import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPost(postId: number) {
    return this.http.get<Post>(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  deletePost(post: Post) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
  }

  updatePost(post: Post) {
    return this.http.put(
      `https://jsonplaceholder.typicode.com/post/${post.id}`,
      post
    );
  }
}
