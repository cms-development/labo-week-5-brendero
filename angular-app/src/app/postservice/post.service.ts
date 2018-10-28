import { Json } from './../Json';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, filter } from 'rxjs/operators';

import { MessageService } from './../messageservice/message.service';
import { Post } from '../post';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
   })
};

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private postUrl = 'http://localhost/jsonapi/node/article?sort=-created&include=uid,uid.user_picture,field_image';
  private log(message: string) {
    this.messageService.add(`PostService: ${message}`);
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  // TODO: CREATE
  addPost(post: Json): Observable<Post> {
    return this.http.post<Post>('http://localhost/jsonapi/node/article', post, httpOptions)
          .pipe(
            tap((post: Post) => this.log(`added new post with id ${post.id}`)),
            catchError(this.handleError<Post>('addPost'))
          );
  }

  // READ
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl, httpOptions)
    .pipe(
      tap(posts => this.log('fetched Posts')),
      catchError(this.handleError('getPosts', []))
    );
  }

  // detail
  getPost(id: string): Observable<Post> {
    const url = `http://localhost/jsonapi/node/article/${id}?include=uid,uid.user_picture,field_image`;

    return this.http.get<Post>(url, httpOptions)
    .pipe(
      tap(_ => this.log(`Fetched post with id ${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  // UPDATE
  updatePost (post: Json): Observable<Post> {
    return this.http.patch(`http://localhost/jsonapi/node/article/${post.data.id}`, post, httpOptions)
    .pipe(
      tap(_ => this.log(`updated Post with id=${post.data.id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }


  // DELETE
  deletePost (post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `http://localhost/jsonapi/node/article/${id}`;

    return this.http.delete<Post>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
