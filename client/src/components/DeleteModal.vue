<template>
	<b-modal :ref="id" :id="id" hide-footer hide-header no-fade :no-close-on-esc="isBusy" :no-close-on-backdrop="isBusy" size="md" centered>
		<div class="text-center py-4 px-2">
			<span class="d-block text-danger p-5">
				<b-icon icon="trash" scale="8" />
			</span>

			<h2 class="delete-msg text-blue my-3">
				Are you sure you want to delete this <strong>{{ field }}</strong>
			</h2>

			<p class="text-muted mb-4">This action cannot be undone.</p>

			<div class="d-flex text-center">
				<b-btn ref="cancelBtn" class="w-50 mr-3" variant="outline-blue" :disabled="isBusy" @click="cancel"> No, Cancel </b-btn>
				<b-btn class="w-50 d-flex align-items-center justify-content-center" variant="danger" @click="ok" :disabled="isBusy">
					<span> Yes, Delete </span>
					<b-spinner small class="ml-2" v-if="isBusy"></b-spinner>
				</b-btn>
			</div>
		</div>
	</b-modal>
</template>

<script>
let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
	props: {
		id: {
			type: String,
			default: "deleteModal"
		},
		field: {
			type: String,
			default: "field"
		}
	},

	data() {
		return { isBusy: false, bridge: null };
	},

	methods: {
		open(data) {
			this.bridge = data;

			this.$nextTick(async () => {
				this.$bvModal.show(this.id);
				await sleep(50);
				this.popUpAnimation();
				this.$refs.cancelBtn.focus();
			});
		},

		close() {
			this.bridge = null;

			this.setBusy(false);

			this.$nextTick(() => {
				this.$bvModal.hide(this.id);
			});
		},

		cancel() {
			this.$emit("cancel", this.bridge);

			this.close();
		},

		setBusy(value) {
			this.isBusy = !!value;
		},

		ok() {
			this.$emit("ok", this.bridge);
		},

		async popUpAnimation(evt) {
			if (evt) evt.preventDefault();

			let content = this.$refs[this.id].$refs.content;

			content.style.transition = "transform 0.2s ease";

			content.style.transform = "scale(0.9)";

			await sleep(100);

			content.style.transform = "none";

			await sleep(100);

			content.style.transform = "scale(0.9)";

			await sleep(100);

			content.style.transform = "none";
		}
	}
};
</script>

<style lang="scss">
.delete-msg {
	line-height: 1.5;
}
</style>
