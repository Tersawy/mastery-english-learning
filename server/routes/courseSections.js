const router = require("express").Router();

const CourseSectionController = require("../Controllers/CourseSectionController");

const { auth, instructorAndAdmin } = require("../middlewares/auth");

router.get("/:courseId/sections", CourseSectionController.all);

router.get("/:courseId/sections/:sectionId", CourseSectionController.show);

router.post("/:courseId/sections", auth, instructorAndAdmin, CourseSectionController.create);

router.put("/:courseId/sections/:sectionId", auth, instructorAndAdmin, CourseSectionController.update);

router.delete("/:courseId/sections/:sectionId", auth, instructorAndAdmin, CourseSectionController.remove);

router.post("/sections/:sectionId/lectures", auth, instructorAndAdmin, CourseSectionController.createLecture);

router.put("/sections/:sectionId/lectures/:lectureId", auth, instructorAndAdmin, CourseSectionController.updateLecture);

router.delete("/sections/:sectionId/lectures/:lectureId", auth, instructorAndAdmin, CourseSectionController.removeLecture);

router.post("/sections/:sectionId/lectures/:lectureId/upload-video", auth, instructorAndAdmin, CourseSectionController.uploadLectureVideo);

module.exports = router;
