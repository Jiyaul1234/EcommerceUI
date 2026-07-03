# Environment Configuration

## Overview

This application uses Angular environment configuration to manage different settings for development and production builds.

## Environment Files

### Development Environment
**File**: `src/environments/environment.ts`

Used when running `ng serve` or `ng build` without `--configuration production`.

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

### Production Environment
**File**: `src/environments/environment.prod.ts`

Used when running `ng build --configuration production`.

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com'
};
```

## Configuration Options

### API URL
- **Development**: `http://localhost:3000` (local backend)
- **Production**: `https://api.yourdomain.com` (production backend)

## Using Environment Configuration

### In Services
```typescript
import { environment } from '@environments/environment';

export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }
}
```

### In Components
```typescript
import { environment } from '@environments/environment';

export class DebugComponent {
  isProduction = environment.production;
  apiUrl = environment.apiUrl;
}
```

## Building for Different Environments

### Development Build
```bash
ng build
# or
ng serve
```

Uses `src/environments/environment.ts`

### Production Build
```bash
ng build --configuration production
```

Uses `src/environments/environment.prod.ts`

## Adding New Environments

### 1. Create Environment File
Create `src/environments/environment.staging.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://staging-api.yourdomain.com'
};
```

### 2. Update angular.json
Add configuration in `projects.ui.architect.build.configurations`:
```json
"staging": {
  "fileReplacements": [
    {
      "replace": "src/environments/environment.ts",
      "with": "src/environments/environment.staging.ts"
    }
  ]
}
```

### 3. Use New Environment
```bash
ng serve --configuration staging
ng build --configuration staging
```

## Environment Variables

### Using .env File (Optional)
For local development with sensitive data:

1. Create `.env.local` file (excluded from git):
```
API_URL=http://localhost:3000
JWT_SECRET=your-secret-key
```

2. Update environment.ts to read from environment variables:
```typescript
export const environment = {
  production: false,
  apiUrl: process.env['API_URL'] || 'http://localhost:3000'
};
```

Note: This requires additional build configuration.

## Configuration Best Practices

1. **Never Commit Secrets**
   - Add `.env*` files to `.gitignore`
   - Store secrets in environment variables or secrets management service

2. **Use Type Safety**
   ```typescript
   export interface Environment {
     production: boolean;
     apiUrl: string;
   }

   export const environment: Environment = { /* ... */ };
   ```

3. **Consistent Naming**
   - Use camelCase for configuration keys
   - Use descriptive names

4. **Default Values**
   - Always provide sensible defaults
   - Use optional chaining or nullish coalescing

5. **Documentation**
   - Document required configuration options
   - Include example values

## Available Configurations

| Setting | Development | Production |
|---------|-------------|-----------|
| Production Mode | false | true |
| API URL | http://localhost:3000 | https://api.yourdomain.com |
| Optimization | false | true |
| Source Maps | true | false |

## Troubleshooting

### Environment Not Updating
- Clear `node_modules/.cache` directory
- Restart development server with `ng serve --poll`

### Wrong Environment Used
- Check build configuration in angular.json
- Verify correct flag used (`--configuration production`)

### API URL Issues
- Verify backend server is running
- Check network requests in browser DevTools
- Ensure CORS is configured on backend

## Related Documentation

- [Angular Environments](https://angular.io/guide/build#configuring-environment-specific-defaults)
- [Angular CLI Build Configuration](https://angular.io/cli/build)
- [Angular Deployment Guide](https://angular.io/guide/deployment)
