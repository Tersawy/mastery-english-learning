const mongoose= require("mongoose");

const Section = require("../Models/Section");

exports.all = async (req, res) => {
	let query = { course: mongoose.Types.ObjectId(req.params.courseId) };

	let aggregate = [
		{ $match: query },
		{
			$lookup: {
				localField: "_id",
				foreignField: "section",
				from: "lectures",
				as: "lectures"
			}
		}
	]

	let sections = Section.aggregate(aggregate);
	let sectionsCount = Section.countDocuments(query);

	Promise.all([sections, sectionsCount]).then(([sections, total]) => {
		return res.json({ docs: sections, total });
	});
};

exports.show = async (req, res) => {
	let { sectionId } = req.params;

	let aggregate = [
		{ $match: { _id: mongoose.Types.ObjectId(sectionId) } },
		{
			$lookup: {
				localField: "_id",
				foreignField: "section",
				from: "lectures",
				as: "lectures"
			}
		}
	]

	let sections = await Section.aggregate(aggregate);

	return res.json(sections[0] || {});
};

exports.create = async (req, res) => {
	const { title } = req.body;

	let section = new Section({ title, course: req.params.courseId });

	await section.save();

	res.status(200).json({ msg: "Section has been created successfully" });
};

exports.update = async (req, res) => {
	const { title } = req.body;

	await Section.updateOne({ _id: req.params.sectionId, deleted_at: null }, { title });

	res.status(200).json({ msg: "Section has been updated successfully" });
};

exports.remove = async (req, res) => {
	await Section.deleteOne({ _id: req.params.sectionId });
	res.status(200).json({ msg: "Section has been deleted successfully" });
};
