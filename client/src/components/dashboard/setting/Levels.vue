<template>
	<b-card no-body class="h-100">
		<template #header>
			<div class="d-flex justify-content-between align-items-center">
				<span>Levels</span>
				<b-btn variant="outline-primary" size="sm" @click="create">Create</b-btn>
			</div>
		</template>

		<b-table hover responsive @context-changed="contextChanged" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :items="items" :fields="fields" class="mb-3">
			<template #cell(actions)="row">
				<b-icon icon="pencil-square" scale="1.2" variant="success" class="c-pointer" @click="update(row.item)" />
				<b-icon icon="trash" scale="1.2" variant="danger" class="ml-3 c-pointer" @click="remove(row.item)" />
			</template>
		</b-table>

		<b-pagination v-model="page" limit="3" :total-rows="docsCount" :per-page="perPage" align="fill" size="sm" class="pagination mt-auto px-2" pills></b-pagination>

		<LevelForm />

		<DeleteFieldModal msg="Are you sure to delete this level ?" @done="removeLevel" modal-id="deleteLevelModal" />
	</b-card>
</template>

<script>
	import LevelForm from "@/components/dashboard/setting/LevelForm";
	import dataTableMixin from "@/mixins/dataTableMixin";
	import DeleteFieldModal from "@/components/DeleteFieldModal.vue";
	export default {
		components: { LevelForm, DeleteFieldModal },

		mixins: [dataTableMixin],

		data() {
			return {
				namespace: "Level",
				fields: [
					{ key: "name", label: "Name", sortable: true },
					{ key: "actions", label: "Actions" }
				],
				perPage: 5
			};
		},
		methods: {
			create() {
				this.$store.commit("Level/setOne", {});
				this.$bvModal.show("levelForm");
			},

			update(level) {
				this.$store.commit("Level/setOne", level);
				this.$bvModal.show("levelForm");
			},

			remove(level) {
				this.$store.commit("Level/setOne", level);
				this.$bvModal.show("deleteLevelModal");
			},

			async removeLevel() {
				try {
					let res = await this.$store.dispatch("Level/remove", this.$store.state.Level.one);

					if (res && res.msg) this.setGlobalSuccess(res.msg);

					this.$nextTick(() => {
						this.$bvModal.hide("deleteLevelModal");
					});
				} catch (err) {
					//
				}
			}
		}
	};
</script>

<style lang="scss" scoped></style>
