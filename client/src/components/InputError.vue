<template>
	<div class="input-error text-danger">
		<span v-if="errorExist">{{ errorMsg() }}</span>
	</div>
</template>

<script>
	export default {
		props: ["field", "vuelidate", "namespace"],
		data() {
			return {
				validationMsgs: {
					required: "{attr} required",
					minLength: "{attr} must be greater than or equal {value} characters",
					maxLength: "{attr} must be less than or equal {value} characters",
					minValue: "{attr} should be greater than or equal {value}",
					maxValue: "{attr} should be greater than or equal {value}",
					numeric: "{attr} must be a valid number",
					email: "{attr} is not valid",
					sameAsPassword: "Passwords must be identical."
				}
			};
		},
		computed: {
			errors() {
				return this.$store.state[this.namespace].errors;
			},

			isVuelidateError() {
				return this.vuelidate.$invalid && this.vuelidate.$dirty;
			},

			isStoreError() {
				let error = this.errors[this.field];
				return !!error && (typeof error === "string" || Array.isArray(error));
			},

			errorExist() {
				return this.isVuelidateError || this.isStoreError;
			}
		},
		methods: {
			errorMsg() {
				if (this.isStoreError) {
					let error = this.errors[this.field];

					if (Array.isArray()) return error[0];

					return error;
				}

				let error = "";

				if (this.isVuelidateError) {
					Object.keys(this.vuelidate.$params).forEach((p) => {
						if (!this.vuelidate[p]) {
							let [attr] = this.field.split("_");

							attr = attr.charAt().toUpperCase() + attr.slice(1);

							attr = attr.endsWith("s") ? attr + " are " : attr + " is ";

							let value = "";

							if (p == "minValue" || p == "minLength") {
								value = this.vuelidate.$params[p].min;
							}
							if (p == "maxValue" || p == "maxLength") {
								value = this.vuelidate.$params[p].max;
							}

							error = this.getMsg(p, { attr, value });
						}
					});
				}

				return error;
			},

			getMsg(p, { attr, value }) {
				let msg = this.validationMsgs[p] || "";

				msg = msg.replace("{attr}", attr);

				msg = msg.replace("{value}", value);

				return msg;
			}
		}
	};
</script>

<style lang="scss">
	.input-error {
		font-size: 10px;
		margin-top: 3px;
		// padding-bottom: 10px;
	}
	// .form-group {
	// 	margin-bottom: 0;
	// }
</style>
