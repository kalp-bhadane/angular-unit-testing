import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post | undefined;
  @Output() onDelete = new EventEmitter<Post>();

  constructor() { }

  ngOnInit(): void {
  }

  onDeletePost() {
    this.onDelete.emit(this.post);
  }

}
