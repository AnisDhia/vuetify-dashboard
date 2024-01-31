<template>
    <v-card>
        <v-card-title>
            <v-col>
                <h1 class="display-1">Teachers</h1>
                <v-row>
                    <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
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
    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.teachers = [
                {
                    name: 'John Doe',
                    specialty: 'Algorithms and Data Structures',
                    departement: 'Computer Science',
                    email: 'john.doe@example.com',
                    phone: '0634567890'
                },
                {
                    name: 'Alice Smith',
                    specialty: 'Machine Learning',
                    departement: 'Computer Science',
                    email: 'alice.smith@example.com',
                    phone: '0645678901'
                },
                {
                    name: 'Robert Johnson',
                    specialty: 'Databases',
                    departement: 'Information Systems',
                    email: 'robert.johnson@example.com',
                    phone: '0656789012'
                },
                {
                    name: 'Emily Brown',
                    specialty: 'Network Security',
                    departement: 'Cybersecurity',
                    email: 'emily.brown@example.com',
                    phone: '0667890123'
                },
                {
                    name: 'Michael Wilson',
                    specialty: 'Artificial Intelligence',
                    departement: 'Computer Science',
                    email: 'michael.wilson@example.com',
                    phone: '0678901234'
                },
                {
                    name: 'Sophia Davis',
                    specialty: 'Human-Computer Interaction',
                    departement: 'Information Systems',
                    email: 'sophia.davis@example.com',
                    phone: '0689012345'
                },
                {
                    name: 'James Miller',
                    specialty: 'Software Engineering',
                    departement: 'Computer Science',
                    email: 'james.miller@example.com',
                    phone: '0690123456'
                },
                {
                    name: 'Olivia Garcia',
                    specialty: 'Web Development',
                    departement: 'Computer Science',
                    email: 'olivia.garcia@example.com',
                    phone: '0701234567'
                },
                {
                    name: 'William Rodriguez',
                    specialty: 'Computer Graphics',
                    departement: 'Computer Science',
                    email: 'william.rodriguez@example.com',
                    phone: '0712345678'
                },
                {
                    name: 'Ava Martinez',
                    specialty: 'Data Science',
                    departement: 'Statistics',
                    email: 'ava.martinez@example.com',
                    phone: '0723456789'
                },
                {
                    name: 'Liam Brown',
                    specialty: 'Mobile App Development',
                    departement: 'Computer Science',
                    email: 'liam.brown@example.com',
                    phone: '0734567890'
                },
                {
                    name: 'Emma Davis',
                    specialty: 'Computer Vision',
                    departement: 'Computer Science',
                    email: 'emma.davis@example.com',
                    phone: '0745678901'
                },
                {
                    name: 'Noah Wilson',
                    specialty: 'Embedded Systems',
                    departement: 'Electrical Engineering',
                    email: 'noah.wilson@example.com',
                    phone: '0756789012'
                },
                {
                    name: 'Isabella Taylor',
                    specialty: 'Cryptography',
                    departement: 'Cybersecurity',
                    email: 'isabella.taylor@example.com',
                    phone: '0767890123'
                },
                {
                    name: 'Ethan Anderson',
                    specialty: 'Natural Language Processing',
                    departement: 'Linguistics',
                    email: 'ethan.anderson@example.com',
                    phone: '0778901234'
                },
                {
                    name: 'Sophie Miller',
                    specialty: 'Game Development',
                    departement: 'Computer Science',
                    email: 'sophie.miller@example.com',
                    phone: '0789012345'
                },
                {
                    name: 'Mason White',
                    specialty: 'Cloud Computing',
                    departement: 'Computer Science',
                    email: 'mason.white@example.com',
                    phone: '0790123456'
                },
                {
                    name: 'Amelia Harris',
                    specialty: 'Computer Networks',
                    departement: 'Computer Science',
                    email: 'amelia.harris@example.com',
                    phone: '0801234567'
                },
                {
                    name: 'Henry King',
                    specialty: 'Algorithmic Trading',
                    departement: 'Finance',
                    email: 'henry.king@example.com',
                    phone: '0812345678'
                },
                {
                    name: 'Scarlett Turner',
                    specialty: 'Quantum Computing',
                    departement: 'Physics',
                    email: 'scarlett.turner@example.com',
                    phone: '0823456789'
                }

            ]
        },
        filterOnlyCapsText(value, search) {
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search) !== -1
        },
        addTeacher(teacher) {
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
        editTeacher(teacher) {
            if (this.editedIndex > -1) {
                Object.assign(this.teachers[this.editedIndex], teacher)
            } else {
                this.teachers.push(teacher)
            }

            this.closeEdit()
        },
        deleteTeacher() {
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
    },
}
</script>
