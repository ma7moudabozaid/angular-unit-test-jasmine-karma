import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  @Input() item: any;

  @Output() loadData = new EventEmitter<string>();

  formGroup!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: UntypedFormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  get IsValid() {
    return this.formGroup.controls;
  }

  ngOnInit() {
    this.getFormData();

    if (this.item) {
      this.formGroup.patchValue(this.item);
    }
  }
  getFormData() {
    this.formGroup = this.fb.group({
      _id: 0,
      name: ['', Validators.required],
      desc: ['', Validators.required],
      image: 'image',
      createdAt: '',
    });
  }

  CreatData() {
    if (this.formGroup.value._id == 0) {
      this.AddData();
    } else {
      this.editData();
    }
  }
  AddData() {
    console.log(this.formGroup.value);

    return this.categoryService
      .add(this.formGroup.value)
      .subscribe((response: any) => {
        if (response) {
          // this.sharedService.toastrSuccess('Done');
          this.formGroup.reset();
          this.getFormData();
          this.loadData.emit(response);
        } else {
          // this.sharedService.toastrError('Error');
        }
      });
  }

  editData() {
    return this.categoryService
      .update(this.formGroup.value, this.formGroup.value._id)
      .subscribe((response: any) => {
        if (response) {
          // this.sharedService.toastrSuccess('Done');
          this.formGroup.reset();
          this.getFormData();
          this.loadData.emit(response);
        } else {
          // this.sharedService.toastrError('Error');
        }
      });
  }
  // ===============================================================================
}
