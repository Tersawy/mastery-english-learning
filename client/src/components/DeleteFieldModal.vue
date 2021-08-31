<template>
	<b-modal
		:id="modalId"
		body-class="p-0"
		hide-footer
		hide-header
		centered
		@hide="btnLoading = false"
		:no-close-on-backdrop="btnLoading"
		:no-close-on-esc="btnLoading"
		class="delete-field-modal"
	>
		<div class="modal-delete">
			<div class="modal-icon">
				<i class="fa fa-times"></i>
			</div>
			<p class="modal-msg py-4">
				<slot name="msg">{{ msg }}</slot>
			</p>
			<div class="modal-btn-action d-flex justify-content-center">
				<b-btn class="mx-1" size="md" variant="danger" v-if="!btnLoading" @click="done"> Ok </b-btn>
				<b-btn disabled class="mx-1" size="md" variant="danger" v-else>
					Loading...
					<b-spinner type="grow" small></b-spinner>
				</b-btn>
				<b-btn class="mx-1" size="md" variant="blue" @click="$bvModal.hide(modalId)" :disabled="btnLoading"> No </b-btn>
			</div>
		</div>
	</b-modal>
</template>

<script>
	export default {
		props: ["msg", "modalId"],

		data() {
			return { btnLoading: false };
		},

		methods: {
			done() {
				this.btnLoading = true;
				this.$emit("done");
			}
		}
	};
</script>

<style lang="scss">
	.modal-delete {
		position: relative;
		min-height: 120px;
		padding: 90px 16px 16px;
		.modal-icon {
			position: absolute;
			top: -60px;
			left: calc(50% - 60px);
			width: 120px;
			height: 120px;
			background-color: var(--danger);
			font-size: 80px;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
		}
		.modal-msg {
			text-align: center;
			font-size: 20px;
		}
		.modal-btn-action {
			.btn:disabled {
				cursor: wait;
			}
		}
	}
</style>
