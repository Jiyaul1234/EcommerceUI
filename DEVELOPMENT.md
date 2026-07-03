# Development Guide

This guide covers development setup, conventions, and best practices for the E-Commerce application.

## Development Environment Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd UI
```

### 2. Install Node Modules
```bash
npm install --legacy-peer-deps
```

### 3. Configure Environment
Update `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000' // Your backend API URL
};
```

### 4. Start Development Server
```bash
ng serve --open
```

Navigate to `http://localhost:4200`. The application will automatically reload if you change any source files.

## Project Structure Conventions

### Folder Organization
```
src/app/
├── core/                    # Singleton services, guards, interceptors
├── shared/                  # Reusable components, models, directives
├── features/                # Feature-specific components and logic
└── environments/            # Environment configurations
```

### Naming Conventions
- **Components**: `app-component-name` (kebab-case)
- **Services**: `service-name.service.ts` (kebab-case)
- **Models**: `model-name.model.ts` (kebab-case)
- **Files**: `component-name.component.ts`
- **Classes**: `PascalCase`
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`

### File Structure
Every component should follow this structure:
```
component-name/
├── component-name.component.ts      # Component logic
├── component-name.component.html    # Template
└── component-name.component.scss    # Styles
```

## Component Development

### Creating a New Component

1. **Component Class**
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.scss']
})
export class ComponentNameComponent implements OnInit {
  ngOnInit(): void {
    // Initialization logic
  }
}
```

2. **Template (HTML)**
```html
<div class="component-container">
  <!-- Component markup -->
</div>
```

3. **Styles (SCSS)**
```scss
.component-container {
  // Styles
}
```

### Component Best Practices
- Use standalone components (no NgModule)
- Keep components focused and single-responsibility
- Use `OnInit` for initialization logic
- Unsubscribe from observables to prevent memory leaks
- Use `async` pipe when possible
- Use @Input/@Output for component communication
- Keep templates simple; move logic to component class

## Service Development

### Creating a New Service

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private apiUrl = `${environment.apiUrl}/api/endpoint`;

  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<any>(`${this.apiUrl}/items`);
  }
}
```

### Service Best Practices
- Place in `src/app/core/services/`
- Use `providedIn: 'root'` for singleton services
- Use typed HTTP calls
- Implement error handling
- Document public methods
- Use environment configuration for URLs

## Routing

### Adding a New Route

Update `src/app/app.routes.ts`:
```typescript
export const routes: Routes = [
  {
    path: 'feature',
    loadComponent: () => import('@features/feature/feature.component')
      .then(m => m.FeatureComponent),
    canActivate: [authGuard]
  }
];
```

### Route Guards
- `AuthGuard`: Protects routes requiring authentication
- Use `canActivate` for route protection

## Forms & Validation

### Reactive Forms
```typescript
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

constructor(private fb: FormBuilder) {}

form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]]
});
```

### Custom Validators
```typescript
export function passwordMatchValidator(group: FormGroup): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}
```

## State Management with RxJS

### BehaviorSubject
```typescript
private itemsSubject = new BehaviorSubject<Item[]>([]);
items$ = this.itemsSubject.asObservable();

addItem(item: Item) {
  const current = this.itemsSubject.value;
  this.itemsSubject.next([...current, item]);
}
```

### Subscribe Pattern
```typescript
this.service.items$.subscribe(items => {
  this.items = items;
});
```

### Unsubscribe Pattern
```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.items$.pipe(
    takeUntil(this.destroy$)
  ).subscribe(items => {
    this.items = items;
  });
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

## HTTP Requests

### GET Request
```typescript
this.http.get<Item>(`${this.apiUrl}/item/${id}`).subscribe(
  item => { /* handle response */ },
  error => { /* handle error */ }
);
```

### POST Request
```typescript
this.http.post<Item>(`${this.apiUrl}/items`, data).subscribe(
  response => { /* handle response */ },
  error => { /* handle error */ }
);
```

### Using Interceptors
Interceptors automatically add JWT tokens and handle loading states. No additional configuration needed.

## Styling Guidelines

### SCSS Variables
Use the global `src/styles.scss` for:
- Colors
- Typography
- Spacing
- Breakpoints

### Naming Convention
```scss
.component-name__element--modifier {
  // BEM (Block, Element, Modifier) pattern
}
```

### Responsive Design
```scss
@media (max-width: 768px) {
  // Mobile styles
}
```

## Testing

### Running Tests
```bash
ng test
```

### Unit Test Template
```typescript
describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Building for Production

### Build Command
```bash
ng build --configuration production
```

### Optimization Features
- Tree-shaking (unused code removal)
- Minification
- Code splitting
- Lazy loading
- AOT compilation

## Debugging

### Browser DevTools
- Use Angular DevTools extension
- Inspect component properties
- Check network requests
- View application state

### Console Logging
```typescript
console.log('Debug message:', data);
console.error('Error:', error);
console.warn('Warning:', warning);
```

### Angular CLI Debug
```bash
ng serve --source-map
```

## Common Tasks

### Adding a New Feature
1. Create feature folder in `src/app/features/`
2. Create component, service if needed
3. Add route in `app.routes.ts`
4. Add navigation link in navbar

### Fixing a Bug
1. Create test to reproduce issue
2. Fix the bug
3. Ensure test passes
4. Check for side effects

### Updating Dependencies
```bash
npm update
ng update @angular/cli @angular/core
```

### Code Formatting
```bash
npx prettier --write "src/**/*.ts"
```

## TypeScript Best Practices

### Strict Mode
- Always enable strict mode (enabled by default)
- Avoid `any` types
- Use explicit types

### Type Definitions
```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

// Avoid
const user: any = { id: 1, name: 'John' };
```

## Performance Tips

1. **Use OnPush Change Detection**
   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

2. **Lazy Load Routes**
   - Already configured with loadComponent

3. **Unsubscribe from Observables**
   - Use `takeUntil` or `unsubscribe()`

4. **Use TrackBy in Lists**
   ```typescript
   trackByFn(index: number, item: Item) {
     return item.id;
   }
   ```

## Security Guidelines

1. **Sanitize User Input**
   - Angular automatically sanitizes template bindings
   - Use `DomSanitizer` for HTML content

2. **HTTPS in Production**
   - Always use HTTPS for API calls
   - Store sensitive data securely

3. **JWT Token**
   - Stored in localStorage (consider httpOnly cookies in production)
   - Automatically injected by interceptor

4. **CORS Configuration**
   - Backend should configure CORS properly
   - Production should use secure origins only

## Code Review Checklist

- [ ] Code follows naming conventions
- [ ] Components are focused and single-responsibility
- [ ] Types are properly defined (no `any`)
- [ ] Error handling implemented
- [ ] Observables properly unsubscribed
- [ ] No console logs in production code
- [ ] Responsive design tested
- [ ] Accessibility considered

## Useful Commands

```bash
# Generate component
ng generate component features/my-component

# Generate service
ng generate service core/services/my-service

# Format code
npx prettier --write "src/**/*.{ts,html,scss}"

# Lint code
ng lint

# Build and serve production
ng build --configuration production && npm start
```

## Resources

- [Angular Documentation](https://angular.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [Material Design Icons](https://fonts.google.com/icons)
- [RxJS Documentation](https://rxjs.dev/guide/overview)

---

For more information, refer to the main README.md or contact the development team.
