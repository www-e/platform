# Missing Features

This document outlines the features that are missing from the Course Selling Platform.

## Core Functionality

*   **User Roles and Permissions:** The `User` model in `prisma/schema.prisma` has a `role` field, and the `auth.ts` file includes the role in the session. However, there is no logic to handle different user roles (e.g., `STUDENT`, `TEACHER`, `ADMIN`). For example, the admin dashboard is not protected and can be accessed by any logged-in user.
*   **Course Enrollment:** While there is an `Enrollment` model, there is no UI or API to allow students to enroll in courses.
*   **Video Playback:** The `Video` model has a `bunnyVideoId`, but there is no video player component to play the videos. The `SecureBunnyPlayer.tsx` component is a good start, but it's not used anywhere.
*   **Exam Functionality:** The `Exam` and `ExamResult` models exist, but there is no way to create, take, or view exams.
*   **Payment Gateway Integration:** There is no integration with a payment gateway to allow users to purchase courses.

## Admin Dashboard

*   **Dashboard Stats:** The admin dashboard has placeholders for stats, but the API routes to fetch the data are not fully implemented.
*   **User Management:** The admin dashboard has a "Students" page, but there is no way to manage users (e.g., create, edit, delete).
*   **Course Management:** The admin can create courses, but there is no way to edit or delete them.
*   **Exam Management:** The admin can view exams, but there is no way to create, edit, or delete them.

## User Profile

*   **Data Fetching:** The profile page fetches data from the following API routes:
    *   `/api/profile/courses`
    *   `/api/profile/exams`
    *   `/api/profile/stats`
    However, these routes are not fully implemented and do not return any data.
