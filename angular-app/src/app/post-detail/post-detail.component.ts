import { Json } from './../Json';
import { PostService } from './../postservice/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Json;
  includes: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPost();
  }

  delete(post: Post): void {
    this.postService.deletePost(post).subscribe(
      () => this.goBack()
    );
  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.getPost(id)
        .subscribe(
          post => this.post = post.data
        );
    this.postService.getPost(id)
        .subscribe(
          post => this.includes = post.included
        );
  }

  goBack(): void {
    this.location.back();
  }

}
