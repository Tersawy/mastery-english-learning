const CourseSections = require("../Models/CourseSections");

exports.all = async (req, res) => {
	let query = { course: req.params.courseId };
	let sections = CourseSections.find(query);
	let sectionsCount = CourseSections.countDocuments(query);

	Promise.all([sections, sectionsCount]).then(([sections, total]) => {
		return res.json({ docs: sections, total });
	});
};

exports.show = async (req, res) => {
	let { sectionId: _id } = req.params;

	let section = await CourseSections.findById(_id);

	return res.json(section);
};

exports.create = async (req, res) => {
	const { title } = req.body;

	let section = new CourseSections({ title, course: req.params.courseId });

	await section.save();

	res.status(200).json({ msg: "Section has been created successfully" });
};

exports.update = async (req, res) => {
	const { title } = req.body;

	await CourseSections.updateOne({ _id: req.params.sectionId, deleted_at: null }, { title });

	res.status(200).json({ msg: "Section has been updated successfully" });
};

exports.remove = async (req, res) => {
	await CourseSections.deleteOne({ _id: req.params.sectionId });
	res.status(200).json({ msg: "Section has been deleted successfully" });
};
