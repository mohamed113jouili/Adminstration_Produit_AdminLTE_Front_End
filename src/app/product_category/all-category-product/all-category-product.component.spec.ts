import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCategoryProductComponent } from './all-category-product.component';

describe('AllCategoryProductComponent', () => {
  let component: AllCategoryProductComponent;
  let fixture: ComponentFixture<AllCategoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCategoryProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
