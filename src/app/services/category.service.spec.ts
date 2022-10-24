import { Category } from './../models/category';
import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestMock: HttpTestingController;
  let apiUrl: string = environment.apiUrl + 'category/';

  let mockData = [
    { _id: '1', name: 'one', desc: 'desc', image: 'image' },
    { _id: '2', name: 'two', desc: 'desc', image: 'image' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });

    service = TestBed.inject(CategoryService);
    httpTestMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get() should make a GET HTTP request and return all data items', () => {
    service.get().subscribe((res: Category[]) => {
      console.log(res);
      expect(res).toEqual(mockData);
      expect(res.length).toBe(2);
    });

    const req = httpTestMock.expectOne(apiUrl + 'get');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockData);
    httpTestMock.verify();
  });

  it('Add() Data should make a POST HTTP request with resource as body', () => {
    const createObj = { _id: '1', name: 'one', desc: 'desc', image: 'image' };
    service.add(createObj).subscribe((res) => {
      expect(res).toBe(createObj);
    });
    const req = httpTestMock.expectOne(
      `http://localhost:3000/api/category/add`,
      'post to api'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(createObj);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(createObj);
    httpTestMock.verify();
  });

  it('update() should make a POST HTTP request with id appended to end of url and resource as body', () => {
    const updateObj = { _id: '1', name: 'one1', desc: 'desc', image: 'image' };
    service.update(updateObj, '1').subscribe((res: any) => {
      expect(res).toBe(updateObj);
    });
    const req = httpTestMock.expectOne(
      `http://localhost:3000/api/category/update/1`,
      'POST to api'
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(updateObj);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(updateObj);
    httpTestMock.verify();
  });

  it('delete() should make a DELETE HTTP request with id appended to end of url', () => {
    const delObj = { _id: '1', name: 'one1', desc: 'desc', image: 'image' };

    service.delete('1').subscribe((res: any) => {
      expect(res).toBe(1);
    });
    const req = httpTestMock.expectOne(
      `http://localhost:3000/api/category/delete/1`
    );

    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(1);
    httpTestMock.verify();
  });
});
