export default {
	prefix: "chat",
	test: "",
	active: false,
	contacts: {
		docs: [],
		total: 0,
		unSeenMessagesCount: 0
	},
	currentContact: { messages: { docs: [], total: 0, unSeenMessagesCount: 0, hasMoreMessages: true, skip: 0 }, isWrite: false }
};
