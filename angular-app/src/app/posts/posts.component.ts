import { PostService } from './../postservice/post.service';
import { Post } from './../post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  posts: Post[];
  includes: Post;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts()
        .subscribe(Posts => this.posts = Posts.data);

    this.postService.getPosts()
        .subscribe(
          Posts => this.includes = Posts.included
        );
  }
}
