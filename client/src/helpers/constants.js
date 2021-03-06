export const COURSE_PENDING = 0;
export const COURSE_APPROVED = 1;
export const COURSE_STATUS = [COURSE_PENDING, COURSE_APPROVED];
export const COURSE_STATUS_STR = ["Pending", "Approved"];

export const COURSE_LEVEL_BEGINNER = 0;
export const COURSE_LEVEL_ADVANCED = 1;
export const COURSE_LEVEL_INTERMEDIATE = 2;
export const COURSE_LEVELS = [COURSE_LEVEL_BEGINNER, COURSE_LEVEL_ADVANCED, COURSE_LEVEL_INTERMEDIATE];
export const COURSE_LEVELS_STR = ["Beginner", "Advanced", "Intermediate"];

export const STUDENT = 0;
export const INSTRUCTOR = 1;
export const ADMIN = 2;
export const OWNER = 3;

export const QUESTION_COMPLETE = 0;
export const QUESTION_CHOICE_ONE = 1;
export const QUESTION_TRUE_OR_FALSE = 2;
export const QUESTION_ESSAY = 3;
export const QUESTION_SPEECH = 4;
export const QUESTION_TYPES = [QUESTION_COMPLETE, QUESTION_CHOICE_ONE, QUESTION_TRUE_OR_FALSE, QUESTION_ESSAY];
export const QUESTION_TYPES_STR = ["Complete", "Choice", "True/False", "Essay", "Speech"];
