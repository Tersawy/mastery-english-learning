<template>
	<b-modal id="levelForm" @hidden="resetModal" hide-footer @ok="handleSave" centered @show="modalIsShown">
		<template #modal-header="{ close }">
			<div class="d-flex align-items-center justify-content-between w-100">
				<div class="d-flex align-items-center">
					<template v-if="isUpdate">
						<h6 class="mb-0">
							Update Level: <b-badge variant="outline-success">{{ oldLevel.name }}</b-badge>
						</h6>
					</template>
					<template v-else>
						<h6 class="mb-0">Create Level</h6>
					</template>
				</div>
				<b-button size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default="{ ok }">
			<b-form @submit.prevent="handleSave">
				<!-- -------------Name------------- -->
				<b-form-group label="Level Name" label-for="name">
					<b-form-input id="name" v-model="level.name" ref="nameInput"></b-form-input>
					<input-error :vuelidate="$v.level.name" field="name" :namespace="namespace" />
				</b-form-group>

				<div class="text-right">
					<b-btn v-if="isUpdate" @click="ok()" variant="outline-success">Update</b-btn>
					<b-btn v-else @click="ok()" variant="outline-primary">Save</b-btn>
				</div>
			</b-form>
		</template>
	</b-modal>
</template>

<script>
	import { required, minLength, maxLength } from "vuelidate/lib/validators";
	export default {
		data() {
			return {
				namespace: "Level",
				level: { name: null }
			};
		},

		validations: {
			level: {
				name: { required, minLength: minLength(3), maxLength: maxLength(54) }
			}
		},

		computed: {
			oldLevel() {
				return this.$store.state.Level.one;
			},
			isUpdate() {
				return !!this.oldLevel && !!this.oldLevel._id;
			}
		},

		methods: {
			async handleSave(bvt) {
				bvt.preventDefault();

				this.$v.$touch();

				if (this.$v.$invalid) return;

				let res;

				try {
					if (this.isUpdate) {
						res = await this.$store.dispatch("Level/update", this.level);
					} else {
						res = await this.$store.dispatch("Level/create", this.level);
					}

					await this.$store.dispatch("Level/all");

					this.$bvModal.hide("levelForm");

					this.setGlobalSuccess(res.msg);
				} catch (err) {
					if (err) console.log(err);
				}
			},

			modalIsShown() {
				setTimeout(() => this.$refs.nameInput?.focus(), 400);

				if (this.isUpdate) {
					this.level = { ...this.oldLevel };
				}
			},

			resetModal() {
				this.$v.$reset();

				this.removeAllErrors();

				this.level.name = null;
			}
		}
	};
</script>

<style lang="scss" scoped></style>
