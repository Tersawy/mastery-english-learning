<template>
	<b-modal id="adminForm" @hidden="resetModal" hide-footer @ok="handleSave" size="lg" @show="modalIsShown">
		<template #modal-header="{ close }">
			<div class="d-flex align-items-center justify-content-between w-100">
				<div class="d-flex align-items-center">
					<template v-if="isUpdate">
						<h6 class="mb-0">Update Admin</h6>
					</template>
					<template v-else>
						<h6 class="mb-0">Create Admin</h6>
					</template>
				</div>
				<b-button size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default="{ ok }">
			<b-form @submit="ok()">
				<b-form-group label="Fullname" label-for="fullname">
					<b-form-input type="text" id="fullname" v-model.trim="admin.fullname" />
					<input-error :vuelidate="$v.admin.fullname" field="fullname" :namespace="namespace" />
				</b-form-group>

				<b-form-group label="Phone" label-for="phone">
					<b-form-input type="tel" id="phone" v-model.trim="admin.phone" />
					<input-error :vuelidate="$v.admin.phone" field="phone" :namespace="namespace" />
				</b-form-group>

				<b-form-group label="Username" label-for="username">
					<b-form-input type="text" id="username" v-model.trim="admin.username" />
					<input-error :vuelidate="$v.admin.username" field="username" :namespace="namespace" />
				</b-form-group>

				<b-form-group label="Email address" label-for="email">
					<b-form-input type="email" id="email" v-model.trim="admin.email" />
					<input-error :vuelidate="$v.admin.email" field="email" :namespace="namespace" />
				</b-form-group>

				<b-form-group label="Password" label-for="password" v-if="!isUpdate">
					<b-form-input type="password" id="password" v-model.trim="admin.password" />
					<input-error :vuelidate="$v.admin.password" field="password" :namespace="namespace" />
				</b-form-group>

				<div class="text-right">
					<b-btn variant="outline-primary" class="mt-3" @click="ok()">Save</b-btn>
				</div>
			</b-form>
		</template>
	</b-modal>
</template>

<script>
	import { required, minLength, maxLength, email } from "vuelidate/lib/validators";

	export default {
		data() {
			return {
				namespace: "Admin",
				admin: { username: null, fullname: null, phone: null, email: null, password: null }
			};
		},

		validations() {
			let admin = {
				fullname: { required, minLength: minLength(6), maxLength: maxLength(54) },
				username: { required, minLength: minLength(3), maxLength: maxLength(54) },
				phone: { required, minLength: minLength(4), maxLength: maxLength(54) },
				email: { required, email },
				password: { required, minLength: minLength(8), maxLength: maxLength(54) }
			};

			if (this.isUpdate) delete admin.password;

			return { admin };
		},

		computed: {
			oldAdmin() {
				return this.$store.state.Admin.one;
			},

			isUpdate() {
				return !!this.oldAdmin && !!this.oldAdmin._id;
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
						res = await this.$store.dispatch("Admin/update", this.admin);
					} else {
						res = await this.$store.dispatch("Admin/create", this.admin);
					}

					await this.$store.dispatch("Admin/all");

					this.setGlobalSuccess(res.msg);

					this.$bvModal.hide("adminForm");
				} catch (err) {
					//
				}
			},

			modalIsShown() {
				if (this.isUpdate) {
					this.admin = { ...this.oldAdmin };
				}
			},

			resetModal() {
				this.$v.$reset();

				this.removeAllErrors();

				this.admin = { username: null, fullname: null, phone: null, email: null, password: null };
			}
		}
	};
</script>
