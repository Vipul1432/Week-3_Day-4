import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post$: Observable<Post[]>;
  posts: Post[] = [];
  newPost: Post = { id: 0, title: '', body: '' };
  updatedPost: Post = { id: 0, title: '', body: '' };
  isUpdateMode = false;
  selectedPostForUpdate: Post | null = null;
  showSuccessMessage = false;
  successMessage = '';

  constructor(private postService: PostService) {
    this.post$ = of([]);
  }

  ngOnInit(): void {
    this.fetchPosts();
  }

  async fetchPosts(): Promise<void> {
    this.postService.getPosts().subscribe(posts => {
      this.post$ = of(posts);
      this.posts = posts;
    });
  }

  async createPost(): Promise<void> {
    const post = await this.postService.createPost(this.newPost);
    this.posts.push(post);
    this.newPost = { id: 101, title: '', body: '' };
    this.updatePostObservable();
    this.showSuccessMessage = true;
    this.successMessage = 'Post added successfully.';
    this.hideSuccessMessageAfterDelay();
  }

  async updatePostInput(post: Post): Promise<void> {
    this.isUpdateMode = true;
    this.selectedPostForUpdate = post;
    this.updatedPost = { ...post };
    this.showSuccessMessage = false;
    this.successMessage = '';
  }

  async confirmUpdate(): Promise<void> {
    if (this.selectedPostForUpdate) {
      const updatedPost = await this.postService.updatePost(this.updatedPost);
      const index = this.posts.findIndex(p => p.id === updatedPost.id);
      if (index !== -1) {
        this.posts[index] = updatedPost;
        this.updatePostObservable();
        this.showSuccessMessage = true;
        this.successMessage = 'Post updated successfully.';
        this.hideSuccessMessageAfterDelay();
      }
      this.cancelUpdate();
    }
  }

  cancelUpdate(): void {
    this.isUpdateMode = false;
    this.selectedPostForUpdate = null;
    this.updatedPost = { id: 0, title: '', body: '' };
  }

  async deletePost(id: number): Promise<void> {
    await this.postService.deletePost(id);
    this.posts = this.posts.filter(p => p.id !== id);
    this.updatePostObservable();
    this.showSuccessMessage = true;
    this.successMessage = 'Post deleted successfully.';
    this.hideSuccessMessageAfterDelay();
  }

  private updatePostObservable(): void {
    this.post$ = of([...this.posts]);
  }

  private hideSuccessMessageAfterDelay(): void {
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.successMessage = '';
    }, 3000);
  }
}