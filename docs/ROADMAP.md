# Project Roadmap: Course Platform MVP

This document outlines the plan to get the course platform to a functional, production-ready MVP state.

## Completed Tasks

- [x] **Initial Project Analysis:** Analyzed the codebase to identify missing features and inconsistencies.
- [x] **Implement User Profile APIs:** Backend APIs for the profile page are now functional.
- [x] **Implement Basic RBAC:** Middleware is in place to protect the `/admin` routes.
- [x] **Implement Course Enrollment:** Students can now enroll in courses.
- [x] **Refactor `grade` to Enum:** Replaced the integer-based `grade` with a proper `Grade` enum in the database schema and updated all relevant code.

## Phase 1: Critical MVP Features (Must-Do for Launch)

- [x] **Finalize Database Schema:** Applied the recent schema changes (the new `Grade` enum) to the database via a manual migration.
- [ ] **Enforce Grade-Specific Course Visibility:** Students should only see and be able to enroll in courses for their specific grade.
- [ ] **Secure Video Player:** Implement and verify signed URLs for Bunny.net videos in `SecureBunnyPlayer.tsx` to prevent unauthorized access and video piracy.
- [ ] **Admin: Add Videos to Courses:** Create a UI for admins to add, order, and manage videos for each course. This is essential for making the platform useful.
- [ ] **Production Build Check:** Run `npm run build` to ensure the application builds without any type errors or other issues.

## Phase 2: Admin & Content Management (High Priority)

- [ ] **Admin: Full Course Management (Edit/Delete):** Allow admins to edit and delete existing courses.
- [ ] **Admin: Basic Exam Management:** Implement the functionality for admins to create exams and view student results.
- [ ] **Admin: Student Management:** Implement a page for admins to view a list of all students and their basic information.

## Phase 3: Polish & Post-MVP Features

- [ ] **Improve Frontend Error Handling:** Replace `alert()` calls with a more user-friendly notification system (e.g., toasts).
- [ ] **UI/UX Consistency Pass:** Refactor components to follow a consistent design and code style.
- [ ] **Flesh out Teacher Role:** Define and implement specific permissions for the `TEACHER` role if it's intended to be different from the `ADMIN` role.
- [ ] **Course Progress Tracking:** Add functionality to track which videos a student has completed within a course.
