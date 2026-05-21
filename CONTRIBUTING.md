# Contributing to World Cup Fantasy 2026

Thank you for your interest in contributing! This guide will help you get started.

## 🛠️ Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Set up your database (see [README](README.md#-quick-start))
4. Start both servers in separate terminals

## 📋 Coding Standards

### TypeScript
- Strict mode enabled for both backend and frontend
- Use type annotations for function parameters and return types
- Prefer interfaces over type aliases for object shapes

### Git Commits
We follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: add new feature
fix: fix a bug
docs: documentation changes
style: code style (formatting, semicolons, etc.)
refactor: code refactoring
test: add or update tests
chore: build, CI, dependency updates
```

### Backend
- All controllers use `try/catch` with `next(err)` pattern
- Consistent response format: `{ success: true/false, data/message }`
- Use the Prisma singleton from `src/lib/prisma.ts`
- Validate inputs with express-validator middleware

### Frontend
- Use `<Link>` from Next.js for internal navigation (never raw `<a>`)
- Import icons individually from `lucide-react`
- Use the custom design system tokens (dark-900, primary-500, gold)
- All pages must be responsive (mobile-first)

## 🧪 Testing

Before submitting a PR:
```bash
# Backend — TypeScript compilation check
cd backend && npx tsc --noEmit

# Frontend — Production build
cd frontend && npx next build
```

## 🐛 Reporting Bugs

Open an issue with:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/OS information

## 💡 Feature Requests

Open an issue with the `enhancement` label describing:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

---

Thank you for helping make World Cup Fantasy 2026 even better! ⚽
