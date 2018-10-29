import { FileReaderService } from './../fiereaderservice/file-reader.service';
import { Json } from './../Json';
import { Location } from '@angular/common';
import { PostService } from './../postservice/post.service';
import { Component, OnInit } from '@angular/core';
import { Post, Attributes, Body } from '../post';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  title: string;
  content: string;
  summary: string;
  jsonFormat: Json;
  image64: string;
  post: Post;

  constructor(
    private postService: PostService,
    private location: Location,
    private fileReaderService: FileReaderService
  ) { }

  ngOnInit() {
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];

    console.log(file);
    this.fileReaderService.readFile(file)
        .subscribe(data => {
          this.image64 = data;
          console.log(this.image64);
        });
  }

  addPost(): void {
    this.jsonFormat = new Json();
    this.post = new Post();
    this.post.attributes = new Attributes();
    this.post.attributes.title = this.title;
    this.post.attributes.body = new Body();
    this.post.attributes.body.value = this.content;
    this.post.attributes.body.summary = this.summary;
    this.jsonFormat.data = this.post;

    this.postService.addPost(this.jsonFormat)
          .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
