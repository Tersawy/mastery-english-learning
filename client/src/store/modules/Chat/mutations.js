import Vue from "vue";

export default {
	setActive(state, value) {
		state.active = value;
	},

	setContacts(state, contacts) {
		let docs = contacts.docs.map((contact) => {
			contact.messages.hasMoreMessages = true;
			contact.messages.skip = contact.messages.docs.length;
			return contact;
		});

		state.contacts = { ...contacts, docs };
	},

	setCurrentContact(state, contact) {
		state.currentContact = contact || { messages: { docs: [], total: 0, hasMoreMessages: false, skip: 0 }, isWrite: false };

		if (contact && contact._id) {
			Vue.prototype.$socket.emit("USER::SEEN_ALL:MESSAGE", contact._id);

			state.currentContact.isWrite = false;

			if (contact.messages && contact.messages.docs) {
				state.currentContact.messages.docs = state.currentContact.messages.docs.map((message) => {
					if (!message.mine && message.status != 3) {
						message.status = 3;
						if (state.currentContact.messages.unSeenMessagesCount > 0) {
							state.currentContact.messages.unSeenMessagesCount--;
						}
						if (state.contacts.unSeenMessagesCount > 0) {
							state.contacts.unSeenMessagesCount--;
						}
					}
					return message;
				});
			}
		}
	},

	setContactStatus(state, { userId, status }) {
		if (state.currentContact._id == userId) {
			state.currentContact = { ...state.currentContact, isOnline: status };
		}

		state.contacts.docs = state.contacts.docs.map((contact) => {
			if (contact._id == userId) contact.isOnline = status;
			return contact;
		});
	},

	write(state, { userId, status }) {
		if (state.currentContact._id == userId) {
			state.currentContact = { ...state.currentContact, isWrite: status, isOnline: true };
		} else {
			state.contacts.docs = state.contacts.docs.map((contact) => {
				if (contact._id == userId) {
					contact.isWrite = status;
					contact.isOnline = true;
				}
				return contact;
			});
		}
	},

	setMessages(state, data) {
		if (state.currentContact._id == data._id) {
			state.currentContact = {
				...state.currentContact,
				messages: {
					docs: [...state.currentContact.messages.docs, ...data.messages.docs],
					skip: data.messages.skip,
					hasMoreMessages: data.messages.docs.length > 0
				}
			};
		}

		state.contacts.docs = state.contacts.docs.map((contact) => {
			if (contact._id == data._id) {
				contact.messages = {
					docs: [...contact.messages.docs, ...data.messages.docs],
					skip: data.messages.skip,
					hasMoreMessages: data.messages.docs.length > 0
				};
			}
			return contact;
		});
	},

	addMessage(state, message) {
		if (message.mine) {
			if (state.currentContact._id == message.recipient) {
				state.currentContact.messages.docs = [message, ...state.currentContact.messages.docs];
				state.currentContact.messages.skip = state.currentContact.messages.skip++ || state.currentContact.messages.docs.length;
			} else {
				state.contacts.docs = state.contacts.docs.map((contact) => {
					if (contact._id == message.recipient) {
						contact.messages.docs = [message, ...contact.messages.docs];
						contact.messages.skip = contact.messages.skip++ || contact.messages.docs.length;
					}
					return contact;
				});
			}
		} else {
			Vue.prototype.$socket.emit("USER::UNREADED:MESSAGE", message);

			if (state.currentContact._id == message.sender) {
				if (state.active) {
					Vue.prototype.$socket.emit("USER::SEEN:MESSAGE", message);
				} else {
					state.currentContact.messages.unSeenMessagesCount++;
					state.contacts.unSeenMessagesCount++;
				}

				state.currentContact.messages.docs = [message, ...state.currentContact.messages.docs];
				state.currentContact.messages.skip = state.currentContact.messages.skip++ || state.currentContact.messages.docs.length;
			} else {
				state.contacts.unSeenMessagesCount++;

				state.contacts.docs = state.contacts.docs.map((contact) => {
					if (contact._id == message.sender) {
						contact.messages.docs = [message, ...contact.messages.docs];
						contact.messages.skip = contact.messages.skip++ || contact.messages.docs.length;
						contact.messages.unSeenMessagesCount++;
					}
					return contact;
				});
			}
		}
	},

	unReadMessage(state, message) {
		if (state.currentContact._id == message.recipient) {
			state.currentContact.messages.docs = state.currentContact.messages.docs.map((m) => {
				if (m._id == message._id) {
					m.status = 2;
				}
				return m;
			});
		} else {
			state.contacts.docs = state.contacts.docs.map((contact) => {
				if (contact._id == message.recipient) {
					contact.messages.docs = contact.messages.docs.map((m) => {
						if (m._id == message._id) {
							m.status = 2;
						}
						return m;
					});
				}

				return contact;
			});
		}
	},

	unReadAllMessages(state, userId) {
		if (state.currentContact._id == userId) {
			state.currentContact.messages.docs = state.currentContact.messages.docs.map((m) => {
				m.status = 2;
				return m;
			});
		} else {
			state.contacts.docs = state.contacts.docs.map((contact) => {
				if (contact._id == userId) {
					contact.messages.docs = contact.messages.docs.map((m) => {
						m.status = 2;
						return m;
					});
				}
				return contact;
			});
		}
	},

	seenMessage(state, message) {
		if (state.currentContact._id == message.recipient) {
			state.currentContact.messages.docs = state.currentContact.messages.docs.map((m) => {
				if (m._id == message._id && m.status != 3) {
					m.status = 3;
				}
				return m;
			});
		} else {
			state.contacts.docs = state.contacts.docs.map((contact) => {
				if (contact._id == message.recipient) {
					contact.messages.docs = contact.messages.docs.map((m) => {
						if (m._id == message._id && m.status != 3) {
							m.status = 3;
						}
						return m;
					});
				}

				return contact;
			});
		}
	},

	seenAllMessages(state, userId) {
		if (state.currentContact._id == userId) {
			state.currentContact.messages.docs = state.currentContact.messages.docs.map((m) => {
				if (m.status != 3) {
					m.status = 3;
				}
				return m;
			});
		} else {
			state.contacts.docs = state.contacts.docs.map((contact) => {
				if (contact._id == userId) {
					contact.messages.docs = contact.messages.docs.map((m) => {
						if (m.status != 3) {
							m.status = 3;
						}
						return m;
					});
				}
				return contact;
			});
		}
	}
};
