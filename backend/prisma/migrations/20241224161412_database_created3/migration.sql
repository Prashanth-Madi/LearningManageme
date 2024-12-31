/*
  Warnings:

  - A unique constraint covering the columns `[course_id,teacher_role]` on the table `CourseTeachers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseTeachers_course_id_teacher_role_key" ON "CourseTeachers"("course_id", "teacher_role");
