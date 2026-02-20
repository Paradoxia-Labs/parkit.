# GitHub Actions CI/CD Pipeline

This project uses GitHub Actions to automate testing, linting, and code quality checks.

## Workflow: `ci.yml`

The pipeline runs on:
- **Push** to `main` and `development` branches
- **Pull Requests** to `main` and `development` branches

### Jobs

#### 1. **build-and-test** (Primary)
Runs the core build, lint, and test suite:
- Checks out code
- Sets up Node.js 20.x
- Installs dependencies
- **Build:** Compiles TypeScript with strict mode enabled
- **Lint:** Runs ESLint to enforce code style
- **Test:** Runs Jest test suite with coverage reporting
- **Coverage:** Uploads results to Codecov.io

**Status Required:** ✅ This job **must pass** for PR merge eligibility

#### 2. **security-scan**
Runs `npm audit` to detect vulnerable dependencies.
- Checks for moderate and high severity issues
- Non-blocking (continues on error for visibility)

#### 3. **code-quality**
Additional code quality checks:
- Verifies TypeScript strict mode compliance
- Ensures type safety across the codebase

## Local Testing

To replicate the CI pipeline locally:

```bash
# Install dependencies
npm install
npm --prefix apps/api install

# Build
npm --prefix apps/api run build

# Lint
npm --prefix apps/api run lint

# Test with coverage
npm --prefix apps/api run test -- --coverage
```

## Coverage Reports

Test coverage is automatically uploaded to Codecov.io after successful test runs.

**Coverage Thresholds:**
- Line coverage: Visible in Codecov dashboard
- Collected from: `src/**/*.ts` (excluding tests, types, and index files)

## Debugging Failures

### Build Failures
```bash
npm --prefix apps/api run build
```
Check TypeScript errors in console.

### Lint Failures
```bash
npm --prefix apps/api run lint
```
ESLint will auto-fix issues or report conflicts.

### Test Failures
```bash
npm --prefix apps/api run test -- --detectOpenHandles
```
Use `--detectOpenHandles` to find unclosed connections.

## Environment Variables

No environment variables are required for CI/CD on public repositories. For private tests, add secrets to GitHub Settings → Secrets.

## Adding New Checks

To add new checks to the pipeline, edit `.github/workflows/ci.yml`:

```yaml
- name: Custom Check
  run: npm --prefix apps/api run custom-command
```

Then commit and push—GitHub Actions will automatically pick up the changes.

## Branch Protection

Recommend enabling branch protection rules on `main` and `development`:
- **Require status checks to pass:** Enable `build-and-test`
- **Require code reviews:** Enable minimum 1 reviewer
- **Dismiss stale reviews:** Enable when new commits are pushed
