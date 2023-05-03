import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CategoryService } from '../../services/category.service';

import { CategoryComponent } from './category.component';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoryServiceSpy: any;

  let categoryMock = [
    { _id: '1', name: 'one', desc: 'desc', image: 'image' },
    { _id: '2', name: 'two', desc: 'desc', image: 'image' },
  ];

  beforeEach(async () => {
    const categoryServiceSpy = jasmine.createSpyObj<CategoryService>([
      'get',
      'delete',
    ]);
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: CategoryService, useValue: categoryServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getCategory when category Service return correct result', () => {
    categoryServiceSpy.get.and.returnValue(of(categoryMock));
    fixture.detectChanges();
    component.getCategory();
    expect(component.categories).toEqual(categoryMock);
  });

  it('shoud have a link', () => {
    expect(fixture.debugElement.queryAll(By.css('a')).length).toBe(1);
  });
});
