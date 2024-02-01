<template>
    <v-card>
        <v-card-title>
            <v-col>
                <h1 class="display-1">Students</h1>
                <v-row>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                        hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <!-- <v-btn>
                        Add
                    </v-btn> -->
                    <Add @add-student="addStudent" />
                </v-row>
            </v-col>
        </v-card-title>
        <Edit :dialog="editDialog" :student="editedItem" @save="editStudent" @close-edit="closeEdit" />
        <Delete :dialog="deleteDialog" @delete-student="deleteStudent" @close-delete="closeDelete" />
        <v-data-table :headers="headers" :items="students" item-key="name" class="elevation-1" :search="search">
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
    name: 'StudentsTable',
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
            calories: '',
            students: [],
            editedIndex: -1,
            editedItem: {
                id: '',
                name: '',
                dateOfBirth: '',
                departement: '',
                email: '',
                phone: ''
            },
            defaultItem: {
                id: '',
                name: '',
                dateOfBirth: '',
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
                    text: 'Student',
                    align: 'start',
                    // sortable: false,
                    value: 'name',
                },
                {
                    text: 'Date of Birth',
                    value: 'dateOfBirth',
                    filter: value => {
                        if (!this.dateOfBirth) return true

                        return value < parseInt(this.dateOfBirth)
                    },
                },
                { text: 'Departement', value: 'departement' },
                { text: 'Email', value: 'email' },
                { text: 'Phone', value: 'phone' },
                { text: 'Actions', value: 'actions', sortable: false },
            ]
        },
    },
    async created() {
        this.students = await this.fetchStudents()
    },
    methods: {
        async addStudent(student) {
            const res = await fetch('api/students', {
                method: 'POST',
                body: JSON.stringify(student),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            this.students.push(student)
        },
        openEditDialog(student) {
            this.editedIndex = this.students.indexOf(student)
            this.editedItem = Object.assign({}, student)
            this.editDialog = true
        },
        openDeleteDialog(student) {
            this.editedIndex = this.students.indexOf(student)
            this.editedItem = Object.assign({}, student)
            this.deleteDialog = true
        },
        async editStudent(student) {
            const res = await fetch(`api/students/${student.id}`, {
                method: 'PUT',
                body: JSON.stringify(student),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (this.editedIndex > -1) {
                Object.assign(this.students[this.editedIndex], student)
            } else {
                this.students.push(student)
            }
            // this.editedIndex = this.students.indexOf(student)
            // this.editedItem = Object.assign({}, student)

            this.closeEdit()
        },
        async deleteStudent() {
            const res = await fetch(`api/students/${this.editedItem.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            this.students.splice(this.editedIndex, 1)
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
        async fetchStudents() {
            const res = await fetch('api/students')
            const data = await res.json()
            return data;
        },
    },
}
</script>
