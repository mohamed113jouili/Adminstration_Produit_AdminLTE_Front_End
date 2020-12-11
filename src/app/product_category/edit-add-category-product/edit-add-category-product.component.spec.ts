import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddCategoryProductComponent } from './edit-add-category-product.component';

describe('EditAddCategoryProductComponent', () => {
  let component: EditAddCategoryProductComponent;
  let fixture: ComponentFixture<EditAddCategoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddCategoryProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddCategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
