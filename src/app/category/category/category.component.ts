import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ModalDeleteComponent } from '../../components/modal-delete/modal-delete.component';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    return this.categoryService.get().subscribe((response: Category[]) => {
      this.categories = response;
    });
  }

  open() {
    const modalRef = this.modalService.open(AddCategoryComponent);
    modalRef.componentInstance.name = '';
  }

  openModallAdd() {
    const modalRef = this.modalService.open(AddCategoryComponent);
    modalRef.componentInstance.name = 'add';
    modalRef.componentInstance.loadData.subscribe((result: any) => {
      this.modalService.dismissAll();
      // this.getCategory();
    });
  }

  openModalEdit(item: Category) {
    const modalRef = this.modalService.open(AddCategoryComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.loadData.subscribe((result: any) => {
      this.modalService.dismissAll();
      this.getCategory();
    });
  }

  openModalDelete(item: Category) {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.sendId.subscribe((result: any) => {
      this.delete(result);
      this.modalService.dismissAll();
    });
  }

  delete(item: Category) {
    console.log(item);

    return this.categoryService.delete(item._id).subscribe((response: any) => {
      if (response) {
        // this.sharedService.toastrSuccess(response.Message);
        // this.Departments = this.Departments.filter((x: any) => x !== item);
      } else {
        // this.sharedService.toastrError('Error');
      }
    });
  }
}
