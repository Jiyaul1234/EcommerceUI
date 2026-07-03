import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShippingService, NotificationService } from '@core/services';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shippingForm!: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private shippingService: ShippingService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.shippingForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]]
    });
  }

  get f() {
    return this.shippingForm.controls;
  }

  onSubmit(): void {
    if (this.shippingForm.invalid) {
      this.notificationService.showError('Please fill all required fields');
      return;
    }

    this.isLoading = true;
    this.shippingService.saveShippingAddress(this.shippingForm.value).subscribe({
      next: () => {
        this.notificationService.showSuccess('Shipping address saved!');
        this.router.navigate(['/checkout']);
      },
      error: (err) => {
        this.isLoading = false;
        this.notificationService.showError('Failed to save address');
      }
    });
  }

  skip(): void {
    this.router.navigate(['/checkout']);
  }
}
