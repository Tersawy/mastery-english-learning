<template>
	<div id="app">
		<router-view />
		<Loader />
		<UserProfile />
		<Chat v-if="isAuth" />
	</div>
</template>

<script>
	import Loader from "@/components/Loader";

	const UserProfile = () => import("@/components/UserProfile");

	const Chat = () => import("@/components/chat/Chat");

	export default {
		components: { Loader, UserProfile, Chat },

		async mounted() {
			if (this.isAuth) {
				this.$store.dispatch("Chat/contacts");

				let timer = {};

				this.$socket.on("USER::WRITE", (userId) => {
					this.$store.commit("Chat/write", { userId, status: true });

					if (timer[userId]) {
						clearTimeout(timer[userId]);
						timer[userId] = null;
					}

					timer[userId] = setTimeout(() => {
						this.$store.commit("Chat/write", { userId, status: false });
					}, 1000);
				});

				this.$socket.on("USER::SEND:MESSAGE", (message) => {
					this.$store.commit("Chat/addMessage", message);
				});

				this.$socket.on("USER::UNREADED:MESSAGE", (message) => {
					this.$store.commit("Chat/unReadMessage", message);
				});

				this.$socket.on("USER::SEEN:MESSAGE", (message) => {
					this.$store.commit("Chat/seenMessage", message);
				});

				this.$socket.on("USER::SEEN_ALL:MESSAGE", (userId) => {
					this.$store.commit("Chat/seenAllMessages", userId);
				});

				this.$socket.on("USER::ONLINE", (userId) => {
					this.$store.commit("Chat/setContactStatus", { userId, status: true });
				});

				this.$socket.on("USER::OFFLINE", (userId) => {
					this.$store.commit("Chat/setContactStatus", { userId, status: false });
				});
			}
		}
	};
</script>
