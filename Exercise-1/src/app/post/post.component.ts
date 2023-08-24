import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  newPost: Post = { id: 0, title: '', body: '' };
  updatedPost: Post = { id: 0, title: '', body: '' };
  isUpdateMode = false;
  selectedPostForUpdate: Post | null = null;
  showSuccessMessage = false;
  successMessage = '';


  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  async fetchPosts(): Promise<void> {
    this.posts = await this.postService.getPosts();
  }

  async createPost(): Promise<void> {
    const post = await this.postService.createPost(this.newPost);
    this.posts.push(post);
    this.newPost = { id: 101, title: '', body: '' };
    this.showSuccessMessage = true;
    this.successMessage = 'Post added successfully.';
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.successMessage = '';
    }, 3000);
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
        this.showSuccessMessage = true;
        this.successMessage = 'Post updated successfully.';
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.successMessage = '';
        }, 3000);
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
    this.showSuccessMessage = true;
    this.successMessage = 'Post deleted successfully.';
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.successMessage = '';
    }, 3000);
  }
}
