import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostService } from '../services/post.service';
import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [PostService],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should get all posts from getAllPosts', () => {
    spyOn(component, 'isLoggedIn').and.returnValue(true);
    spyOn(component, 'isUserClickedBtn').and.stub();
    const service = fixture.debugElement.injector.get(PostService);
    spyOn(service, 'getPosts').and.returnValue(of([{ id: 1 }]));
    component.getAllPosts();
    expect(component.allPosts).toEqual([{ id: 1 }]);
  });
});
