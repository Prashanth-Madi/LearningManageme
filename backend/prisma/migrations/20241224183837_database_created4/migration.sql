-- AlterTable
CREATE SEQUENCE lessons_position_seq;
ALTER TABLE "Lessons" ALTER COLUMN "position" SET DEFAULT nextval('lessons_position_seq');
ALTER SEQUENCE lessons_position_seq OWNED BY "Lessons"."position";
