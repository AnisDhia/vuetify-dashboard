<template>
    <v-card>
        <v-card-title>
            <v-col>
                <h1 class="display-1">Trainings</h1>
                <v-row>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <Add @add-training="addTraining" />
                </v-row>
            </v-col>
        </v-card-title>
        <Edit :dialog="editDialog" :training="editedItem" @save="editTraining" @close-edit="closeEdit" />
        <Delete :dialog="deleteDialog" @delete-training="deleteTraining" @close-delete="closeDelete" />
        <v-data-table :headers="headers" :items="trainings" item-key="name" class="elevation-1" :search="search"
            :custom-filter="filterOnlyCapsText">
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" v-model="editDialog" @click="openEditDialog(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small v-model="deleteDialog" @click="openDeleteDialog(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import Add from './dialogs/Add.vue'
import Edit from './dialogs/Edit.vue'
import Delete from './dialogs/Delete.vue'

export default {
    name: 'TrainingsTable',
    components: {
        Add,
        Edit,
        Delete
    },
    data() {
        return {
            editDialog: false,
            deleteDialog: false,
            search: '',
            trainings: [],
            editedIndex: -1,
            editedItem: {
                id: '',
                name: '',
                training: '',
                students: [],
            },
            defaultItem: {
                id: '',
                name: '',
                training: '',
                students: [],
            },
        }
    },
    computed: {
        headers() {
            return [
                {
                    text: 'Training',
                    align: 'start',
                    // sortable: false,
                    value: 'name',
                },
                {
                    text: 'Teacher',
                    value: 'teacher.name',
                },
                { text: 'Students', value: 'students.length' },
                { text: 'Actions', value: 'actions', sortable: false },
            ]
        },
    },
    async created() {
        this.trainings = await this.fetchTrainings()
    },
    methods: {
        filterOnlyCapsText(value, search) {
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search) !== -1
        },
        async addTraining(training) {
            const res = await fetch('api/trainings', {
                method: 'POST',
                body: JSON.stringify(training),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            this.trainings.push(training)
        },
        openEditDialog(training) {
            this.editedIndex = this.trainings.indexOf(training)
            this.editedItem = Object.assign({}, training)
            this.editDialog = true
        },
        openDeleteDialog(training) {
            this.editedIndex = this.trainings.indexOf(training)
            this.editedItem = Object.assign({}, training)
            this.deleteDialog = true
        },
        async editTraining(training) {
            console.log('editing...', training)
            const res = await fetch(`api/trainings/${training.id}`, {
                method: 'PUT',
                body: JSON.stringify(training),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (this.editedIndex > -1) {
                Object.assign(this.trainings[this.editedIndex], training)
            } else {
                this.trainings.push(training)
            }

            this.closeEdit()
        },
        async deleteTraining() {
            const res = await fetch(`api/trainings/${this.editedItem.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            this.trainings.splice(this.editedIndex, 1)
            this.closeDelete()
        },
        closeDelete() {
            this.deleteDialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })

        },
        closeEdit() {
            this.editDialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        async fetchTrainings() {
            const res = await fetch('api/trainings')
            const data = await res.json()
            return data
        }
    },
}
</script>
