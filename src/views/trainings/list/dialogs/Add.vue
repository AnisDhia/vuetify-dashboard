<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                    Add Training
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Add Training
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-form ref="form">
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="name" label="Full Name" :rules="nameRules"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select v-model="teacher" :items="teachersForSelect" label="teacher" item-text="name" prepend-icon="mdi-human-male-board"
                                        item-value="name" return-object></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select v-model="students" :items="studentsForSelect" label="Students" multiple prepend-icon="mdi-account-group-outline"
                                        item-text="name" return-object>
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

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="onSubmit">
                        Add
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'AddDialog',
    data() {
        return {
            dialog: false,
            name: '',
            teacher: {},
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
        }
    },
    async created() {
        this.teachersForSelect = await this.fetchTeachers()
        this.studentsForSelect = await this.fetchStudents()
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()

            if (!this.$refs.form.validate()) {
                alert('Please fill all fields!')
                return
            }

            this.dialog = false
            this.$emit('add-training', {
                name: this.name,
                teacher: this.teacher,
                students: this.students,
            })
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
        },
        close() {
            this.$emit('close-add')
            this.students = []
            this.name = ''
            this.teacher = ''
        },
    },
    emits: ['add-training'],
}
</script>