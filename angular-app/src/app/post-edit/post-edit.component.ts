import { Location } from '@angular/common';
import { PostService } from './../postservice/post.service';
import { Component, OnInit } from '@angular/core';
import { Post} from '../post';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post;
  constructor(
    private postService: PostService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  save(): void {
    this.postService.updatePost(this.post)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
