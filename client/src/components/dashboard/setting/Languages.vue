<template>
	<b-card no-body class="h-100">
		<template #header>
			<div class="d-flex justify-content-between align-items-center">
				<span>Languages</span>
				<b-btn variant="outline-primary" size="sm" @click="create">Create</b-btn>
			</div>
		</template>

		<b-table
			hover
			responsive
			@context-changed="contextChanged"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:current-page="1"
			:busy="tableIsBusy"
			:per-page="perPage"
			:items="items"
			:fields="fields"
			class="mb-3"
		>
			<template #cell(actions)="row">
				<b-icon icon="pencil-square" scale="1.2" variant="success" class="c-pointer" @click="update(row.item)" />
				<b-icon icon="trash" scale="1.2" variant="danger" class="ml-3 c-pointer" @click="remove(row.item)" />
			</template>
		</b-table>

		<b-pagination v-model="page" :per-page="perPage" limit="3" :total-rows="docsCount" align="fill" size="sm" class="pagination mt-auto px-2" pills></b-pagination>

		<LanguageForm />

		<DeleteFieldModal msg="Are you sure to delete this language ?" @done="removeLanguage" modal-id="deleteLanguageModal" />
	</b-card>
</template>

<script>
	import LanguageForm from "@/components/dashboard/setting/LanguageForm";
	import dataTableMixin from "@/mixins/dataTableMixin";
	import DeleteFieldModal from "@/components/DeleteFieldModal.vue";
	export default {
		components: { LanguageForm, DeleteFieldModal },

		mixins: [dataTableMixin],

		data() {
			return {
				namespace: "Language",
				fields: [
					{ key: "name", label: "Name", sortable: true },
					{ key: "actions", label: "Actions" }
				],
				perPage: 5
			};
		},
		methods: {
			create() {
				this.$store.commit("Language/setOne", {});
				this.$bvModal.show("languageForm");
			},

			update(language) {
				this.$store.commit("Language/setOne", language);
				this.$bvModal.show("languageForm");
			},

			remove(language) {
				this.$store.commit("Language/setOne", language);
				this.$bvModal.show("deleteLanguageModal");
			},

			async removeLanguage() {
				try {
					let res = await this.$store.dispatch("Language/remove", this.$store.state.Language.one);

					if (res && res.msg) this.setGlobalSuccess(res.msg);

					this.$nextTick(() => {
						this.$bvModal.hide("deleteLanguageModal");
					});
				} catch (err) {
					//
				}
			}
		}
	};
</script>

<style lang="scss" scoped></style>
