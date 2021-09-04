<template>
	<b-card no-body class="h-100">
		<template #header>
			<div class="d-flex justify-content-between align-items-center">
				<span>Categories</span>
				<b-btn variant="outline-primary" size="sm" @click="create">Create</b-btn>
			</div>
		</template>
		<b-table hover responsive :items="items" :fields="fields" class="mb-0">
			<template #cell(actions)="row">
				<b-icon icon="pencil-square" scale="1.2" variant="success" class="c-pointer" @click="update(row.item)" />
				<b-icon icon="trash" scale="1.2" variant="danger" class="ml-3 c-pointer" @click="remove(row.item)" />
			</template>
		</b-table>
		<CategoryForm />
		<DeleteFieldModal msg="Are you sure to delete this category ?" @done="removeCategory" modal-id="deleteCategoryModal" />
	</b-card>
</template>

<script>
	import CategoryForm from "@/components/dashboard/setting/CategoryForm";
	import dataTableMixin from "@/mixins/dataTableMixin";
	import DeleteFieldModal from "@/components/DeleteFieldModal.vue";
	export default {
		components: { CategoryForm, DeleteFieldModal },

		mixins: [dataTableMixin],

		data() {
			return {
				namespace: "Category",
				fields: [
					{ key: "name", label: "Name" },
					{ key: "actions", label: "Actions" }
				]
			};
		},
		methods: {
			create() {
				this.$store.commit("Category/setOne", {});
				this.$bvModal.show("categoryForm");
			},

			update(category) {
				this.$store.commit("Category/setOne", category);
				this.$bvModal.show("categoryForm");
			},

			remove(category) {
				this.$store.commit("Category/setOne", category);
				this.$bvModal.show("deleteCategoryModal");
			},

			async removeCategory() {
				try {
					let res = await this.$store.dispatch("Category/remove", this.$store.state.Category.one);

					if (res && res.msg) this.setGlobalSuccess(res.msg);

					this.$nextTick(() => {
						this.$bvModal.hide("deleteCategoryModal");
					});
				} catch (err) {
					//
				}
			}
		}
	};
</script>

<style lang="scss" scoped></style>
