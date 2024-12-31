-- AlterTable
ALTER TABLE "Lessons" ALTER COLUMN "position" DROP DEFAULT;
DROP SEQUENCE "lessons_position_seq";
