import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  async getPosts(): Promise<Post[]> {
    return firstValueFrom(this.http.get<Post[]>(this.apiUrl));
  }

  async getPostById(id: number): Promise<Post> {
    const url = `${this.apiUrl}/${id}`;
    return firstValueFrom(this.http.get<Post>(url));
  }

  async createPost(post: Post): Promise<Post> {
    return firstValueFrom(this.http.post<Post>(this.apiUrl, post));
  }

  async updatePost(post: Post): Promise<Post> {
    const url = `${this.apiUrl}/${post.id}`;
    return firstValueFrom(this.http.put<Post>(url, post));
  }

  async deletePost(id: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    await firstValueFrom(this.http.delete(url));
  }
}
