-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('FIRST', 'SECOND', 'THIRD');

-- AlterTable
ALTER TABLE "users" ADD COLUMN "gradeEnum" "Grade";

-- UpdateData
UPDATE "users" SET "gradeEnum" = CASE "grade"
  WHEN 1 THEN 'FIRST'::"Grade"
  WHEN 2 THEN 'SECOND'::"Grade"
  WHEN 3 THEN 'THIRD'::"Grade"
  ELSE NULL
END;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN "gradeEnum" "Grade";

-- UpdateData
UPDATE "courses" SET "gradeEnum" = CASE "grade"
  WHEN 1 THEN 'FIRST'::"Grade"
  WHEN 2 THEN 'SECOND'::"Grade"
  WHEN 3 THEN 'THIRD'::"Grade"
  ELSE NULL
END;

-- AlterTable
ALTER TABLE "exams" ADD COLUMN "gradeEnum" "Grade";

-- UpdateData
UPDATE "exams" SET "gradeEnum" = CASE "grade"
  WHEN 1 THEN 'FIRST'::"Grade"
  WHEN 2 THEN 'SECOND'::"Grade"
  WHEN 3 THEN 'THIRD'::"Grade"
  ELSE NULL
END;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "grade", ALTER COLUMN "gradeEnum" SET NOT NULL, ALTER COLUMN "gradeEnum" SET DEFAULT 'FIRST';
ALTER TABLE "users" RENAME COLUMN "gradeEnum" TO "grade";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "grade", ALTER COLUMN "gradeEnum" SET NOT NULL, ALTER COLUMN "gradeEnum" SET DEFAULT 'FIRST';
ALTER TABLE "courses" RENAME COLUMN "gradeEnum" TO "grade";

-- AlterTable
ALTER TABLE "exams" DROP COLUMN "grade", ALTER COLUMN "gradeEnum" SET NOT NULL, ALTER COLUMN "gradeEnum" SET DEFAULT 'FIRST';
ALTER TABLE "exams" RENAME COLUMN "gradeEnum" TO "grade";
