import { Json } from './../Json';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from './../postservice/post.service';
import { Component, OnInit } from '@angular/core';
import { Post, Attributes, Body} from '../post';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post;
  id: string;
  title: string;
  content: string;
  summary: string;
  jsonFormat: Post;
  postData: Post;

  constructor(
    private postService: PostService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPostValue();
  }

  getPostValue(): void {
    this.postService.getPost(this.id)
      .subscribe(post => this.postData = post.data)
  }

  editPost(): void {
    this.jsonFormat = new Json();
    this.post = new Post();
    this.post.id = this.id;
    this.post.attributes = new Attributes();
    this.post.attributes.title = this.postData.attributes.title;
    this.post.attributes.body = new Body();
    this.post.attributes.body.value = this.postData.attributes.body.value;
    this.post.attributes.body.summary = this.postData.attributes.body.summary;
    this.jsonFormat.data = this.post;

    this.postService.updatePost(this.jsonFormat)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
