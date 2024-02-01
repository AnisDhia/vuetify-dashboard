<template>
    <v-dialog :value="dialog" @input="close" max-width="500px" @click:outside="close">
        <v-card>
            <v-card-title>
                <span class="text-h5"> Edit Item </span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-form>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="name" label="Full Name" :rules="nameRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select v-model="teacher" :items="teachersForSelect" label="teacher" item-text="name"
                                    prepend-icon="mdi-human-male-board" return-object></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select v-model="students" :items="studentsForSelect" label="Students" item-text="name"
                                    prepend-icon="mdi-account-group-outline" multiple return-object>
                                    <template v-slot:selection="{ item, index }">
                                        <v-chip v-if="index === 0">
                                            <span>{{ item.name }}</span>
                                        </v-chip>
                                        <span v-if="index === 1" class="grey--text text-caption">
                                            (+{{ students.length - 1 }} others)
                                        </span>
                                    </template>
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                    Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'EditDialog',
    props: {
        training: {
            type: Object,
            required: true
        },
        dialog: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            // dialog: false,
            name: '',
            teacher: '',
            students: [],

            teachersForSelect: [],
            studentsForSelect: [],

            nameRules: [
                value => {
                    if (value) return true

                    return 'Name is required.'
                },
                value => {
                    if (value?.length >= 3) return true

                    return 'Name must more than 3 characters.'
                },
            ],
        };
    },
    async created() {
        this.teachersForSelect = await this.fetchTeachers()
        this.studentsForSelect = await this.fetchStudents()
        this.name = this.training.name
        this.teacher = this.training.teacher
        this.students = this.training.students
        console.log(this.students, this.training.students)
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        training() {
            this.name = this.training.name
            this.teacher = this.training.teacher
            this.students = this.training.students
        }
    },
    methods: {
        save() {
            this.training.name = 'test'
            console.log(this.training.id)
            this.$emit('save', {
                id: this.training.id,
                name: this.name,
                teacher: this.teacher,
                students: this.students,
            })
        },
        close() {
            this.$emit('close-edit')
            this.students = []
            this.name = ''
            this.teacher = ''
        },
        async fetchStudents() {
            const res = await fetch('api/students')
            const data = await res.json()
            return data
        },
        async fetchTeachers() {
            const res = await fetch('api/teachers')
            const data = await res.json()
            return data
        }
    },
}
</script>
