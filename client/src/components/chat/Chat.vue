<template>
	<div class="chat__container">
		<div class="chat__icon" @click="toggleChat">
			<div class="chat__icon-body">
				<i class="fas fa-comments"></i>
			</div>
			<div class="chat__icon-messages-count" v-if="unSeenMessagesCount">{{ unSeenMessagesCount }}</div>
		</div>

		<div class="chat__view" ref="chatView" :class="{ active, 'current-chat': isCurrentContact }">
			<div class="chat__header">
				<div class="chat__header-return" @click="openContacts">
					<i class="fas fa-chevron-left"></i>
				</div>

				<div class="chat__header-title">
					<span v-if="!isCurrentContact">Chat</span>
					<template v-else>
						<div class="chat__header-title-avatar" :class="{ online: currentContact.isOnline }">
							<img :src="`${userImageURL}/${currentContact.image}`" />
						</div>
						<div>
							<span class="chat__header-title-name">{{ currentContact.username }}</span>
							<div class="user-write" v-if="currentContact.isWrite">write now......</div>
						</div>
					</template>
				</div>

				<div class="chat__header-close" @click="toggleChat">
					<i class="fas fa-times"></i>
				</div>
			</div>
			<div class="chat__body">
				<div class="chat__contacts">
					<div class="chat__contacts-header">
						<div class="chat__contacts-header-search">
							<input type="text" placeholder="Type to search..." v-model="search" />
						</div>
					</div>
					<div class="chat__contacts-body">
						<div class="chat__contact" v-for="(contact, i) in contacts" :key="i" @click="openContact(contact)">
							<div class="chat__contact-avatar" :class="{ online: contact.isOnline }">
								<img :src="`${userImageURL}/${contact.image}`" alt="" />
								<div class="chat__contact-info-message-count" v-if="contact.messages.unSeenMessagesCount">{{ contact.messages.unSeenMessagesCount }}</div>
							</div>
							<div class="chat__contact-info">
								<div class="chat__contact-info-name">
									<span>{{ contact.username }}</span>
								</div>
								<div class="chat__contact-info-last-message" v-if="contact.messages.docs.length">
									<span>{{ contact.messages.docs[0].text }}</span>
									<span class="chat__contact-info-last-message-status chat__message-status" v-if="contact.messages.docs[0].mine">
										<span v-if="contact.messages.docs[0].status === 0" class="failed">
											<svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon"><g transform="translate(8 8) scale(1.3 1.3) translate(-8 -8)"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></g></svg>
										</span>
										<span v-if="contact.messages.docs[0].status === 1" class="sent">
											<svg viewBox="0 0 16 16" width="1.1em" height="1.1em" focusable="false" role="img" aria-label="check" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon"><g  transform="translate(8 8) scale(1.7 1.7) translate(-8 -8)"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path></g></svg>
										</span>
										<span v-else-if="contact.messages.docs[0].status === 2" class="received">
											<svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="check all" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon"><g transform="translate(8 8) scale(1.7 1.7) translate(-8 -8)"><path d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"></path></g></svg>
										</span>
										<span v-else-if="contact.messages.docs[0].status === 3" class="read">
											<svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="check all" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon"><g transform="translate(8 8) scale(1.7 1.7) translate(-8 -8)"><path d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"></path></g></svg>
										</span>
									</span>
								</div>
								<div class="user-write" v-if="contact.isWrite">write now......</div>
							</div>
						</div>
					</div>
				</div>
				<div class="chat__messages">
					<div class="chat__messages-body" ref="messagesBody" :class="{ loading: isLoadMessages }">
						<div class="chat__message" v-for="(message, i) in currentMessages" :key="i" :class="{ mine: message.mine }">
							<div class="chat__message-content">
								<div class="chat__message-content-text">
									<span v-hasArabicCharacter>{{ message.text }}</span>
									<div class="chat__message-content-text-status chat__message-status" v-if="message.mine">
										<span v-if="message.status === 0" class="failed">
											<svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon"><g transform="translate(8 8) scale(1.3 1.3) translate(-8 -8)"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></g></svg>
										</span>
										<span v-if="message.status === 1" class="sent">
											<svg viewBox="0 0 16 16" width="1.1em" height="1.1em" focusable="false" role="img" aria-label="check" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon"><g  transform="translate(8 8) scale(1.7 1.7) translate(-8 -8)"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path></g></svg>
										</span>
										<span v-else-if="message.status === 2" class="received">
											<svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="check all" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon"><g transform="translate(8 8) scale(1.7 1.7) translate(-8 -8)"><path d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"></path></g></svg>
										</span>
										<span v-else-if="message.status === 3" class="read">
											<svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="check all" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon"><g transform="translate(8 8) scale(1.7 1.7) translate(-8 -8)"><path d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"></path></g></svg>
										</span>
									</div>
								</div>
							</div>
						</div>

						<div v-if="isCurrentContact" v-b-visible="loadMessages"></div>
					</div>
					<div class="chat__messages-footer">
						<form @submit.prevent="newMessage">
							<textarea ref="inputMsg" type="text" @keypress.enter="newMessage" placeholder="Type a message..." v-model="data.message" />
							<div class="chat__send-btn" @click="newMessage">
								<i class="fas fa-paper-plane"></i>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// https://novnc.com/info.html
	// https://www.npmjs.com/package/@novnc/novnc
	// https://vnc.tryhackme.tech/index.html?host=proxy-2.tryhackme.tech&password=e84b9c39aa6d529e&proxyIP=10.10.58.169&resize=remote
	// https://tempail.com/
	export default {
		name: "Chat",
		data() {
			return {
				namespace: "Chat",
				isLoadMessages: false,
				data: { message: "" },
				search: ""
			};
		},

		mounted() {
			window.onresize = () => {
				if (window.innerWidth <= 768) {
					let topRect = this.$refs.chatView.getBoundingClientRect().top;

					topRect = topRect < 0 ? 160 : topRect;

					this.$refs.chatView.style.height = (window.innerHeight - topRect) + "px";
				} else {
					this.$refs.chatView.style.height = "";
				}
			};
		},

		watch: {
			data: {
				handler(v) {
					if (v.message.length > 0) {
						this.$socket.emit("USER::WRITE", this.currentContact._id);
					}

					let arabicChars = /[\u0600-\u06FF]/;
					if (v.message && arabicChars.test(v.message.toString().split(" "))) {
						this.$refs.inputMsg.style.textAlign = "right";
					} else {
						this.$refs.inputMsg.style.textAlign = "left"
					}
				},
				deep: true
			},
			search(textSearch) {
				this.$store.dispatch("Chat/contacts", `?search=${textSearch}`);
			}
		},

		computed: {
			active() {
				return this.$store.state.Chat.active;
			},
			contacts() {
				return this.$store.state.Chat.contacts.docs;
			},
			currentContact() {
				return this.$store.state.Chat.currentContact;
			},
			currentMessages() {
				return this.currentContact?.messages?.docs || [];
			},
			isCurrentContact() {
				return !!this.currentContact?._id;
			},
			unSeenMessagesCount() {
				return this.$store.state.Chat.contacts.unSeenMessagesCount;
			}
		},

		methods: {
			toggleChat() {
				this.$store.commit("Chat/setActive", !this.active);

				if (this.active) {
					this.$refs.chatView.style.display = "block";
				} else {
					setTimeout(() => {
						this.$refs.chatView.style.display = "none";
						
						this.openContacts();
					}, 500);
				}
			},

			openContacts() {
				this.$refs.chatView.classList.remove("current-chat");
				setTimeout(() => {
					this.$store.commit("Chat/setCurrentContact", null);
				}, 500)
			},

			async openContact(contact) {
			
				this.$store.commit("Chat/setCurrentContact", contact);

				this.$refs.chatView.classList.add("current-chat");

				setTimeout(() => {
					this.$refs.inputMsg.focus();
				}, 500);
			},

			async loadMessages(load) {
				console.log(load, this.currentContact.messages.hasMoreMessages)
				if (!load || !this.currentContact.messages.hasMoreMessages) return;

				this.isLoadMessages = true;

				await this.$store.dispatch("Chat/loadMessages");

				this.isLoadMessages = false;
			},

			async newMessage() {
				if (!this.validateForm()) return;

				await this.$store.dispatch("Chat/newMessage", { ...this.data, recipient: this.currentContact._id });

				this.resetForm();

				this.$refs.inputMsg.focus();
			},

			validateForm() {
				return this.data.message.trim().length > 0;
			},

			resetForm() {
				this.data = { message: "" };
			}
		},
		directives: {
			clickOutside: {
				bind(el, binding, vnode) {
					el.clickOutsideEvent = function (event) {
						if (!(el == event.target || el.contains(event.target))) {
							vnode.context[binding.expression](event);
						}
					};
					document.body.addEventListener("click", el.clickOutsideEvent);
				},
				unbind(el) {
					document.body.removeEventListener("click", el.clickOutsideEvent);
					el.clickOutsideEvent = null;
				}
			},
			hasArabicCharacter(el) {
				let arabicChars = /[\u0600-\u06FF]/;
				if (arabicChars.test(el.textContent.toString().split(" "))) {
					if (el.parentElement) {
						el.parentElement.classList.add("arabic-text");
					}
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	$chat-container-width: 300px;
	$chat-container-height: 450px;
	$chat-primary-color: #4c6fa9;
	$chat-blue-color: #6cb3ff;
	$chat-danger-color: #df6d78;
	$chat-success-color: #6dcb90;
	$chat-white-color: #ffffff;
	$chat-light-color: #f3f3f3;
	$chat-lighten-color: #f8f8f8;
	$chat-darken-color: #333333;
	$chat-dark-color: #777777;
	$chat-border-color: #ced4da;
	$animation-duration: 0.4s;

	.chat__container {
		position: fixed;
		bottom: 20px;
		right: 20px;
		.chat__icon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 70px;
			height: 70px;
			background-color: lighten($chat-primary-color, 0%);
			border-radius: 50%;
			box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.5);
			transition: all 0.2s ease-in-out;
			&:hover {
				cursor: pointer;
				transform: scale(1.1);
			}
			.chat__icon-body {
				color: $chat-white-color;
				font-size: 2.5rem;
				cursor: pointer;
			}
			.chat__icon-messages-count {
				position: absolute;
				top: -5px;
				right: -5px;
				width: 20px;
				height: 20px;
				background-color: $chat-danger-color;
				border-radius: 50%;
				color: $chat-white-color;
				font-size: 0.8rem;
				text-align: center;
				line-height: 20px;
			}
		}
		.chat__view {
			width: $chat-container-width;
			height: $chat-container-height;
			background-color: $chat-white-color;
			border-radius: 10px;
			box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.5);
			position: absolute;
			bottom: 80px;
			right: 20px;
			z-index: 1;
			flex-direction: column;
			overflow: hidden;
			display: none;
			animation: popDown $animation-duration ease-in-out 0s 1 forwards;
			@media screen and (max-width: 768px) {
				width: 100vw;
				height: 90vh;
				position: fixed;
				bottom: 0;
				top: 0;
				left: 0;
				right: 0;
				border-radius: 0;
				box-shadow: none;				
			}
			&.active {
				animation-name: popUp;
			}
			.chat__header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 50px;
				border-bottom: 1px solid $chat-border-color;
				.chat__header-title {
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 1.3rem;
					color: $chat-primary-color;
					padding: 0 14px;
					transition: all 0.2s ease-in-out;
					.chat__header-title-avatar {
						width: 25px;
						height: 25px;
						border-radius: 50%;
						background-color: $chat-light-color;
						display: flex;
						align-items: center;
						justify-content: center;
						color: $chat-darken-color;
						position: relative;
						margin-right: 10px;
						&:before {
							content: '';
							width: 7px;
							height: 7px;
							border-radius: 50%;
							background-color: $chat-danger-color;
							position: absolute;
							bottom: 3px;
							right: -4px;
						}
						&.online {
							&:before {
								background-color: $chat-success-color;
							}
						}
						img {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.chat__header-title-name {
						font-size: 0.9rem;
						color: $chat-darken-color;
					}
				}
				.chat__header-return,
				.chat__header-close {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 50px;
					height: 50px;
					cursor: pointer;
					font-size: 1.1rem;
					transition: all 0.1s ease-in-out;
				}
				.chat__header-close {
					opacity: 0.5;
					&:hover {
						opacity: 1;
					}
				}
				.chat__header-return {
					display: none;
					&:hover {
						background-color: $chat-primary-color;
						color: $chat-white-color;
					}
				}
			}
			.chat__body {
				width: 200%;
				height: calc(100% - 50px);
				display: flex;
				position: relative;
				right: 0;
				transition: all 0.5s ease-in-out;
				.chat__messages {
					height: 100%;
					position: relative;
					.chat__messages-body {
						height: calc(100% - 40px);
						overflow-y: auto;
						display: flex;
    				flex-direction: column-reverse;
						&.loading {
							&:before {
								content: "";
								position: absolute;
								z-index: 1;
								width: 1.6rem;
								height: 1.6rem;
								top: 1rem;
								left: calc(50% - 0.8rem);
								border: 0.25em solid $chat-primary-color;
								border-radius: 50%;
								border-right-color: transparent;
								animation: spinner 0.75s linear infinite;
							}
						}
						.chat__message {
							display: flex;
							align-items: flex-start;
							justify-content: flex-start;
							margin-bottom: 10px;
							.chat__message-avatar {
								width: 25px;
								height: 25px;
								border-radius: 50%;
								overflow: hidden;
								img {
									width: 100%;
									height: 100%;
								}
							}
							.chat__message-content {
								margin-left: 15px;
								max-width: calc(100% - 60px);
								.chat__message-content-name {
									font-size: 1.1rem;
									color: $chat-primary-color;
								}
								.chat__message-content-text {
									display: flex;
									justify-content: space-between;
									align-items: center;
									background-color: $chat-light-color;
									padding: 7px;
									border-radius: 3px;
									position: relative;
									margin-top: 12px;
									border-top-left-radius: 0;
									box-shadow: 0.1rem 0.1rem 0.2rem #ccc;
									&.arabic-text {
										flex-direction: row-reverse;
									}
									&:before {
										content: "";
										display: block;
										width: 0;
										height: 0;
										border-style: solid;
										border-width: 10px 0 0 10px;
										border-color: $chat-light-color transparent transparent transparent;
										position: absolute;
										top: 0px;
										left: -10px;
									}
								}
							}
							&.chat__message.mine {
								justify-content: flex-end;
								.chat__message-content {
									margin-right: 15px;
									margin-left: 0;
									.chat__message-content-text {
										background-color: $chat-primary-color;
										color: $chat-white-color;
										border-top-right-radius: 0;
										border-top-left-radius: 3px;
										box-shadow: -0.1rem 0.1rem 0.2rem #ccc;
										&:before {
											right: -10px;
											left: unset;
											border-width: 10px 10px 0 0;
											border-color: $chat-primary-color transparent transparent transparent;
										}
									}
								}
							}
						}
					}
					.chat__messages-footer {
						border-top: 1px solid $chat-border-color;
						form {
							height: 40px;
							display: flex;
							align-items: center;
							justify-content: flex-start;
							textarea {
								width: calc(100% - 40px);
								height: 100%;
								border: none;
								outline: none;
								resize: none;
								padding: 7px 10px;
								font-size: 0.8rem;
								color: $chat-darken-color;
								&::placeholder {
									font-size: 0.9rem;
									color: $chat-dark-color;
								}
							}
							.chat__send-btn {
								width: 60px;
								height: 100%;
								border: none;
								outline: none;
								color: $chat-primary-color;
								font-size: 1.2rem;
								cursor: pointer;
								display: flex;
								align-items: center;
								justify-content: center;
								&:hover {
									transform: scale(1.01);
								}
							}
						}
					}
				}
				.chat__contacts {
					height: 100%;
					background-color: $chat-light-color;
					display: flex;
					flex-direction: column;
					.chat__contacts-header {
						padding: 10px;
						width: 100%;
						height: 40px;
						display: flex;
						align-items: center;
						justify-content: flex-start;
						border-bottom: 1px solid $chat-border-color;
						.chat__contacts-header-search {
							width: 100%;
							input {
								width: 100%;
								height: 100%;
								border: none;
								outline: none;
								resize: none;
								background-color: transparent;
								padding: 7px 10px;
								font-size: 0.8rem;
								color: $chat-darken-color;
								&::placeholder {
									font-size: 0.9rem;
									color: $chat-dark-color;
								}
							}
						}
					}
					.chat__contacts-body {
						width: 100%;
						height: calc(100% - 40px);
						overflow-y: auto;
						overflow-x: hidden;
						background: $chat-white-color;
						.chat__contact {
							width: 100%;
							// height: 60px;
							display: flex;
							align-items: center;
							justify-content: flex-start;
							padding: 10px;
							border-bottom: 1px solid $chat-border-color;
							background: $chat-white-color;
							transition: all 0.1s ease-in-out;
							&:hover {
								background: $chat-lighten-color;
								cursor: pointer;
							}
							.chat__contact-avatar {
								width: 40px;
								height: 40px;
								border-radius: 50%;
								background-color: $chat-light-color;
								display: flex;
								align-items: center;
								justify-content: center;
								font-size: 1.2rem;
								color: $chat-darken-color;
								position: relative;
								.chat__contact-info-message-count {
									position: absolute;
									border-radius: 2px;
									background-color: $chat-danger-color;
									top: -6px;
									right: -6px;
									font-size: 12px;
									text-align: center;
									padding: 1px 6px;
									font-weight: 600;
									color: $chat-white-color;
								}
								&:before {
									content: '';
									width: 10px;
									height: 10px;
									border-radius: 50%;
									background-color: $chat-danger-color;
									position: absolute;
									bottom: 0px;
									right: 2px;
								}
								&.online {
									&:before {
										background-color: $chat-success-color;
									}
								}
								img {
									width: 100%;
									height: 100%;
									border-radius: 50%;
								}
							}
							.chat__contact-info {
								width: calc(100% - 40px);
								height: 100%;
								display: flex;
								align-items: left;
								justify-content: flex-start;
								flex-direction: column;
								margin-left: 10px;
								.chat__contact-info-name {
									font-size: 1rem;
									color: $chat-primary-color;
								}
								.chat__contact-info-last-message {
									font-size: 0.75rem;
									color: $chat-dark-color;
									position: relative;
								}
							}
						}
					}
				}
				.chat__messages,
				.chat__contacts {
					width: 50%;
					.chat__message-status {
						position: absolute;
						right: 5px;
						.icon {
							display: inline-block;
							overflow: visible;
							vertical-align: -0.15em;
						}
						.failed {
							color: $chat-danger-color;
						}
						.sent {
							opacity: 0.5;
						}
						.received {
							opacity: 0.6;
						}
						.read {
							color: $chat-blue-color;
						}
					}
					&.chat__messages {
					.chat__message-status {
						position: relative;
						text-align: right;
						align-self: end;
						right: 0;
						// bottom: -6px
						padding: 0 5px;
					}
					}
				}
			}
			&.current-chat {
				.chat__header {
					.chat__header-return {
						display: flex;
					}
				}
				.chat__body {
					right: 100%;
				}
			}
		}
		.user-write {
			font-size: 0.5rem;
			color: $chat-darken-color;
			display: block;
		}
	}

	@keyframes popUp {
		0% {
			transform: scale(0);
		}
		80% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes popDown {
		0% {
			transform: scale(1);
		}
		40% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(0);
		}
	}

	@keyframes spinner{
		to{
			transform:rotate(1turn);
		}
	}
</style>

//#6EC1E4

						<div class="chat__contact">
							<div class="chat__contact-avatar">
								<img src="https://i.pravatar.cc/300?img=1" alt="" />
							</div>
							<div class="chat__contact-info">
								<div class="chat__contact-info-name">
									<span>John Doe</span>
								</div>
								<div class="chat__contact-info-last-message">
									<span>Welcome to our chat</span>
								</div>
							</div>
						</div>
=========================================================================================================================
						<div class="chat__message">
								<!-- <div class="chat__message-avatar">
									<img src="https://i.pravatar.cc/300?img=1" alt="" />
								</div> -->
								<div class="chat__message-content">
									<!-- <div class="chat__message-content-name">
										<span>John Doe</span>
									</div> -->
									<div class="chat__message-content-text">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget consectetur consectetur, nisi nisi venenatis nisi, euismod
										scelerisque nisi nisi sed nisi. Sed eget nisi sed nisi venenatis nisi euismod nisi. Sed eget nisi sed nisi venenatis nisi euismod nisi.
									</div>
								</div>
							</div>

سايبر سكاي حيث تجد ما تبحث عنه في مختلف تخصصات الأمن السيبراني من دورات مع مدربين ذوي كفاءة عالية ومختبرات افتراضية تحاكي الواقع
