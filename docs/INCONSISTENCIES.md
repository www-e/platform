# Inconsistencies

This document outlines the inconsistencies found in the Course Selling Platform codebase.

## Naming Conventions

*   **File Naming:** Some files use `PascalCase` (e.g., `AdminHeader.tsx`), while others use `kebab-case` (e.g., `course-platform-mvp`). While this is not a major issue, it would be better to stick to one convention.
*   **API Route Naming:** The API routes are not consistently named. For example, some routes use the plural form (e.g., `/api/admin/courses`), while others use the singular form (e.g., `/api/admin/dashboard/activity`).

## Code Style

*   **Component Structure:** Some components are defined in a single file, while others are split into multiple files. For example, the `Courses` component has its own directory, while the `Hero` component is a single file.
*   **Styling:** The styling is not consistent across the application. Some components use inline styles, while others use CSS classes.

## API Design

*   **Error Handling:** The API routes do not have consistent error handling. Some routes return a JSON response with an error message, while others return a plain text response.

## Other

*   **Hardcoded Values:** There are some hardcoded values in the code, such as the `grade` in the `User` model. It would be better to use an enum or a separate model for this.
*   **Unused Files:** There are some unused files in the project, such as `src/components/auth/LoginForm.tsx` and `src/components/auth/RegisterForm.tsx`.
