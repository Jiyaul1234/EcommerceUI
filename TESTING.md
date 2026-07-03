# Testing Guide

This guide covers unit testing, integration testing, and E2E testing for the E-Commerce application.

## Testing Setup

### Test Frameworks

- **Unit Testing**: Jasmine + Karma
- **E2E Testing**: Cypress (or Protractor)
- **Test Coverage**: Istanbul

### Configuration Files

- `karma.conf.js` - Karma test runner configuration
- `cypress.config.ts` - Cypress E2E configuration
- `src/test.ts` - Test environment setup

## Running Tests

### Unit Tests

```bash
# Run unit tests
ng test

# Run tests with code coverage
ng test --code-coverage

# Run tests headless (CI mode)
ng test --watch=false --code-coverage
```

### E2E Tests

```bash
# Run E2E tests
ng e2e

# Run E2E tests in specific browser
ng e2e --browsers=chrome
```

### Coverage Reports

After running tests with coverage, reports are available in:
```
coverage/index.html
```

## Unit Testing

### Component Testing Template

```typescript
describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent],
      providers: [MyService]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Title');
  });
});
```

### Service Testing Template

```typescript
describe('MyService', () => {
  let service: MyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(MyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch items', () => {
    const mockItems = [{ id: 1, name: 'Item' }];

    service.getItems().subscribe(items => {
      expect(items).toEqual(mockItems);
    });

    const req = httpMock.expectOne('/api/items');
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });
});
```

## Test Coverage Goals

| Category | Target |
|----------|--------|
| Statements | > 80% |
| Branches | > 75% |
| Functions | > 80% |
| Lines | > 80% |

## Best Practices

### 1. Test Naming
```typescript
// Good
it('should add two numbers correctly', () => {
  // ...
});

// Avoid
it('add test', () => {
  // ...
});
```

### 2. Arrange-Act-Assert Pattern
```typescript
it('should add item to cart', () => {
  // Arrange
  const item = { id: 1, name: 'Product', price: 100 };
  const service = TestBed.inject(CartService);

  // Act
  service.addToCart(item);

  // Assert
  expect(service.getCartItems()).toContain(item);
});
```

### 3. Mock External Dependencies
```typescript
// Create mock service
const mockApiService = {
  getUser: jasmine.createSpy('getUser')
    .and.returnValue(of({ id: 1, name: 'John' }))
};

// Provide mock in TestBed
TestBed.configureTestingModule({
  providers: [
    { provide: ApiService, useValue: mockApiService }
  ]
});
```

### 4. Test Async Code
```typescript
it('should handle async operation', fakeAsync(() => {
  let result = null;

  service.fetchData().subscribe(data => {
    result = data;
  });

  tick(); // Simulate passage of time

  expect(result).toBe(expectedValue);
}));
```

### 5. Test Form Validation
```typescript
it('should validate email format', () => {
  const form = formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  const control = form.get('email');
  control?.setValue('invalid-email');

  expect(control?.hasError('email')).toBeTruthy();
});
```

## E2E Testing

### Cypress Test Template

```typescript
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  });

  it('should display login form', () => {
    cy.contains('Login').should('be.visible');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
  });

  it('should login successfully', () => {
    cy.get('input[type="email"]')
      .type('test@example.com');
    cy.get('input[type="password"]')
      .type('password123');
    cy.contains('button', 'Login').click();

    cy.url().should('include', '/');
    cy.contains('Welcome').should('be.visible');
  });

  it('should show error on invalid credentials', () => {
    cy.get('input[type="email"]')
      .type('test@example.com');
    cy.get('input[type="password"]')
      .type('wrongpassword');
    cy.contains('button', 'Login').click();

    cy.contains('Invalid email or password')
      .should('be.visible');
  });
});
```

### Common Cypress Commands

```typescript
// Navigation
cy.visit('http://localhost:4200');
cy.go('back');
cy.reload();

// Selection
cy.get('selector');
cy.contains('text');
cy.find('selector');

// Interaction
cy.click();
cy.type('text');
cy.select('option');
cy.submit();

// Assertion
cy.should('be.visible');
cy.should('have.text', 'text');
cy.should('have.value', 'value');

// Wait
cy.wait(3000);
cy.wait('@apiRequest');
```

## Manual Testing Checklist

### Authentication
- [ ] User can register
- [ ] User can login
- [ ] User can logout
- [ ] JWT token is stored in localStorage
- [ ] Protected routes redirect to login

### Product Features
- [ ] Products display correctly
- [ ] Filtering works
- [ ] Sorting works
- [ ] Pagination works
- [ ] Product detail shows information
- [ ] Related products display

### Shopping Cart
- [ ] Can add items to cart
- [ ] Can remove items
- [ ] Quantities update correctly
- [ ] Totals calculate correctly
- [ ] Cart persists on page refresh

### Checkout Flow
- [ ] Checkout requires authentication
- [ ] Shipping address form validates
- [ ] Payment processes
- [ ] Order confirmation displays

### Responsive Design
- [ ] Mobile layout works (< 576px)
- [ ] Tablet layout works (576px - 992px)
- [ ] Desktop layout works (> 992px)
- [ ] Hamburger menu works
- [ ] Touch interactions work

### Performance
- [ ] Page loads within 3 seconds
- [ ] Images load properly
- [ ] Animations are smooth
- [ ] No console errors

## Test Debugging

### Browser DevTools
```typescript
// In test files
debugger; // Pause execution
```

### Console Logging
```typescript
console.log('Component state:', component.state);
console.log('Form value:', form.value);
```

### VSCode Debugging
1. Set breakpoint in test file
2. Run: `ng test --browsers=Chrome --source-map`
3. DevTools opens automatically
4. Step through code

## Continuous Integration

### GitHub Actions Example
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run test -- --watch=false
      - run: npm run e2e
```

## Performance Testing

### Measure Component Performance
```typescript
it('should render component quickly', () => {
  const start = performance.now();
  
  fixture.detectChanges();
  
  const end = performance.now();
  expect(end - start).toBeLessThan(100);
});
```

## Common Testing Issues

### Issue: Test Timeout
**Solution**: Increase timeout
```typescript
it('should load data', (done) => {
  service.getData().subscribe(() => {
    expect(true).toBeTruthy();
    done();
  });
}, 5000); // 5 second timeout
```

### Issue: Async Operations Not Working
**Solution**: Use `fakeAsync` or `async`
```typescript
it('should handle async', fakeAsync(() => {
  service.method().subscribe();
  tick();
  expect(component.data).toBeDefined();
}));
```

### Issue: Component Not Detecting Changes
**Solution**: Call `detectChanges()`
```typescript
fixture.detectChanges();
```

## Resources

- [Jasmine Testing Framework](https://jasmine.github.io/)
- [Karma Test Runner](https://karma-runner.github.io/)
- [Cypress E2E Testing](https://www.cypress.io/)
- [Angular Testing Guide](https://angular.io/guide/testing)

## Code Coverage Standards

```bash
# View coverage report
open coverage/index.html

# Fail if coverage below threshold
ng test --code-coverage --watch=false \
  --code-coverage-exclude="src/**/*.module.ts"
```

---

For more testing information, refer to Angular documentation or contact the development team.
