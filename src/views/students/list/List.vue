<template>
    <v-card>
        <v-card-title>
            <v-col>
                <h1 class="display-1">Students</h1>
                <v-row>
                    <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <!-- <v-btn>
                        Add
                    </v-btn> -->
                    <Add @add-student="addStudent" />
                </v-row>
            </v-col>
        </v-card-title>
        <Delete :student="item" @delete-student="deleteStudent" />
        <v-data-table :headers="headers" :items="students" item-key="name" class="elevation-1" :search="search"
            :custom-filter="filterOnlyCapsText">
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editStudent(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteStudent(item)">
                    mdi-delete
                </v-icon>
                <!-- <v-row>
                    <Edit :student="item" @save="editStudent" />
                    <Delete :student="item" @delete-student="deleteStudent" />
                </v-row> -->
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
            search: '',
            calories: '',
            students: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                dateOfBirth: '',
                departement: '',
                email: '',
            },
            defaultItem: {
                name: '',
                dateOfBirth: '',
                departement: '',
                email: '',
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
    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.students = [
                {
                    name: 'John Doe',
                    dateOfBirth: '1990-01-01',
                    departement: 'Computer Science',
                    email: 'example@mail.com',
                    phone: '0699569858'
                },
                {
                    name: 'Student 1',
                    dateOfBirth: '1991-01-01',
                    departement: 'Electrical Engineering',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
                {
                    name: 'Student 2',
                    dateOfBirth: '1992-02-02',
                    departement: 'Mechanical Engineering',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
                {
                    name: 'Student 3',
                    dateOfBirth: '1993-03-03',
                    departement: 'Civil Engineering',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
                {
                    name: 'Student 4',
                    dateOfBirth: '1994-04-04',
                    departement: 'Computer Science',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
                {
                    name: 'Student 5',
                    dateOfBirth: '1995-05-05',
                    departement: 'Electrical Engineering',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
                {
                    name: 'Student 6',
                    dateOfBirth: '1996-06-06',
                    departement: 'Mechanical Engineering',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
                {
                    name: 'Student 7',
                    dateOfBirth: '1997-07-07',
                    departement: 'Civil Engineering',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
                {
                    name: 'Student 8',
                    dateOfBirth: '1998-08-08',
                    departement: 'Computer Science',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
                {
                    name: 'Student 9',
                    dateOfBirth: '1999-09-09',
                    departement: 'Electrical Engineering',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
                {
                    name: 'Student 10',
                    dateOfBirth: '2000-10-10',
                    departement: 'Mechanical Engineering',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
                {
                    name: 'Student 11',
                    dateOfBirth: '2001-11-11',
                    departement: 'Civil Engineering',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
                {
                    name: 'Student 12',
                    dateOfBirth: '2002-12-12',
                    departement: 'Computer Science',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
                {
                    name: 'Student 13',
                    dateOfBirth: '2003-01-01',
                    departement: 'Electrical Engineering',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
                {
                    name: 'Student 14',
                    dateOfBirth: '2004-01-01',
                    departement: 'Civil Engineering',
                    email: 'example@mail.com',
                    phone: '0699569858'

                },
            ]
        },
        filterOnlyCapsText(value, search) {
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search) !== -1
        },
        addStudent(student) {
            this.students.push(student)
        },
        editStudent(student) {
            console.log(student)
            console.log(index.of(student))
            this.editedIndex = this.students.indexOf(student)
            console.log(this.editedIndex)
            this.editedItem = Object.assign({}, student)
            console.log(this.editedItem)

        },
        deleteStudent(item) {
            const index = this.students.indexOf(item)
            this.students.splice(index, 1)
        },
    },
}
</script>
