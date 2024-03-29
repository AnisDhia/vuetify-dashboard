<template>
    <v-card>
        <v-card-title>
            <v-col>
                <h1 class="display-1">Teachers</h1>
                <v-row>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <!-- <v-btn>
                        Add
                    </v-btn> -->
                    <Add @add-teacher="addTeacher" />
                </v-row>
            </v-col>
        </v-card-title>
        <Edit :dialog="editDialog" :teacher="editedItem" @save="editTeacher" @close-edit="closeEdit" />
        <Delete :dialog="deleteDialog" @delete-teacher="deleteTeacher" @close-delete="closeDelete" />
        <v-data-table :headers="headers" :items="teachers" item-key="name" class="elevation-1" :search="search"
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
    name: 'TeachersTable',
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
            teachers: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                specialty: '',
                departement: '',
                email: '',
                phone: ''
            },
            defaultItem: {
                name: '',
                specialty: '',
                departement: '',
                email: '',
                phone: ''
            },
        }
    },
    computed: {
        headers() {
            return [
                {
                    text: 'Teacher',
                    align: 'start',
                    // sortable: false,
                    value: 'name',
                },
                {
                    text: 'Specialty',
                    value: 'specialty',
                },
                { text: 'Departement', value: 'departement' },
                { text: 'Email', value: 'email' },
                { text: 'Phone', value: 'phone' },
                { text: 'Actions', value: 'actions', sortable: false },
            ]
        },
    },
    async created() {
        this.teachers = await this.fetchTeachers()
    },
    methods: {
        filterOnlyCapsText(value, search) {
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search) !== -1
        },
        async addTeacher(teacher) {
            const res = await fetch('api/teachers', {
                method: 'POST',
                body: JSON.stringify(teacher),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            this.teachers.push(teacher)
        },
        openEditDialog(teacher) {
            this.editedIndex = this.teachers.indexOf(teacher)
            this.editedItem = Object.assign({}, teacher)
            this.editDialog = true
        },
        openDeleteDialog(teacher) {
            this.editedIndex = this.teachers.indexOf(teacher)
            this.editedItem = Object.assign({}, teacher)
            this.deleteDialog = true
        },
        async editTeacher(teacher) {
            const res = await fetch(`api/teachers/${teacher.id}`, {
                method: 'PUT',
                body: JSON.stringify(teacher),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (this.editedIndex > -1) {
                Object.assign(this.teachers[this.editedIndex], teacher)
            } else {
                this.teachers.push(teacher)
            }

            this.closeEdit()
        },
        async deleteTeacher() {
            const res = await fetch(`api/teachers/${this.editedItem.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            this.teachers.splice(this.editedIndex, 1)
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
        async fetchTeachers() {
            const res = await fetch('api/teachers')
            const data = await res.json()
            return data
        }
    },
}
</script>
