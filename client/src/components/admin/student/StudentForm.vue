<template>
	<b-modal id="studentForm" @hidden="resetModal" hide-footer @ok="handleSave" size="lg" @show="modalIsShown">
		<template #modal-header="{ close }">
			<div class="d-flex align-items-center justify-content-between w-100">
				<div class="d-flex align-items-center">
					<template v-if="isUpdate">
						<h6 class="mb-0">Update Student</h6>
					</template>
					<template v-else>
						<h6 class="mb-0">Create Student</h6>
					</template>
				</div>
				<b-button size="sm" variant="outline-danger" @click="close()"> Close </b-button>
			</div>
		</template>
		<template #default="{ ok }">
			<b-form @submit="ok()">
				<b-form-group label="Fullname" label-for="fullname">
					<b-form-input type="text" id="fullname" v-model.trim="student.fullname" />
					<input-error :vuelidate="$v.student.fullname" field="fullname" :namespace="namespace" />
				</b-form-group>

				<b-form-group label="Phone" label-for="phone">
					<b-form-input type="tel" id="phone" v-model.trim="student.phone" />
					<input-error :vuelidate="$v.student.phone" field="phone" :namespace="namespace" />
				</b-form-group>

				<b-form-group label="Username" label-for="username">
					<b-form-input type="text" id="username" v-model.trim="student.username" />
					<input-error :vuelidate="$v.student.username" field="username" :namespace="namespace" />
				</b-form-group>

				<b-form-group label="Email address" label-for="email">
					<b-form-input type="email" id="email" v-model.trim="student.email" />
					<input-error :vuelidate="$v.student.email" field="email" :namespace="namespace" />
				</b-form-group>

				<b-form-group label="Password" label-for="password" v-if="!isUpdate">
					<b-form-input type="password" id="password" v-model.trim="student.password" />
					<input-error :vuelidate="$v.student.password" field="password" :namespace="namespace" />
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
				namespace: "Student",
				student: { username: null, fullname: null, phone: null, email: null, password: null }
			};
		},

		validations() {
			let student = {
				fullname: { required, minLength: minLength(6), maxLength: maxLength(54) },
				username: { required, minLength: minLength(3), maxLength: maxLength(54) },
				phone: { required, minLength: minLength(4), maxLength: maxLength(54) },
				email: { required, email },
				password: { required, minLength: minLength(8), maxLength: maxLength(54) }
			};

			if (this.isUpdate) delete student.password;

			return { student };
		},

		computed: {
			oldStudent() {
				return this.$store.state.Student.one;
			},

			isUpdate() {
				return !!this.oldStudent && !!this.oldStudent._id;
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
						res = await this.$store.dispatch("Student/update", this.student);
					} else {
						res = await this.$store.dispatch("Student/create", this.student);
					}

					await this.$store.dispatch("Student/all");

					this.setGlobalSuccess(res.msg);

					this.$bvModal.hide("studentForm");
					this.$bvModal.hide("dropdownActionModal");
				} catch (err) {
					//
				}
			},

			modalIsShown() {
				if (this.isUpdate) {
					this.student = { ...this.oldStudent };
				}
			},

			resetModal() {
				this.$v.$reset();

				this.student = { username: null, fullname: null, phone: null, email: null, password: null };
			}
		}
	};
</script>
