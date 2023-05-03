import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

interface Post {
  userId?: number;
  id: number;
  title?: string;
  body?: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  isBtnClicked: boolean = false;
  allPosts: Post[] = [];
  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  isUserClickedBtn() {
    this.isBtnClicked = true;
  }
  isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
  }
  getAllPosts() {
    if (this.isLoggedIn()) {
      this.isUserClickedBtn();
      this.postService.getPosts().subscribe((data: any) => {
        console.log(data);
        this.allPosts = data;
      });
    }
  }
}
