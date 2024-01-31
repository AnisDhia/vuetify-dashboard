<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-icon small class="mr-2" v-bind="attrs" v-on="on">
                mdi-pencil
            </v-icon>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5"> Edit Item </span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-form>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="name" label="Full Name"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="dateOfBirth" label="Date of Birth"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="departement" label="Departement"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="faculty" label="Faculty"></v-text-field>
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
    name: 'Dialog',
    props: {
        student: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            dialog: false,
            name: '',
            dateOfBirth: '',
            departement: '',
            faculty: '',

            nameRules: [
                value => {
                    if (value) return true

                    return 'Name is required.'
                },
                value => {
                    if (value?.length <= 10) return true

                    return 'Name must be less than 10 characters.'
                },
            ],
            emailRules: [
                value => {
                    if (value) return true

                    return 'E-mail is requred.'
                },
                value => {
                    if (/.+@.+\..+/.test(value)) return true

                    return 'E-mail must be valid.'
                },
            ],
            phoneRules: [
                value => {
                    if (value) return true

                    return 'Number is requred.'
                },
                value => {
                    if (/^[05|06|07]\d{8}$/.test(value)) return true

                    return 'Invalid phone number.'
                }
            ]
        };
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        student() {
            this.name = this.student.name
            this.dateOfBirth = this.student.dateOfBirth
            this.departement = this.student.departement
            this.faculty = this.student.faculty
        },
    },
    created() {
        this.name = this.student.name
        this.dateOfBirth = this.student.dateOfBirth
        this.departement = this.student.departement
        this.faculty = this.student.faculty
    },
    methods: {
        save() {
            this.$emit('save', {
                name: this.name,
                dateOfBirth: this.dateOfBirth,
                departement: this.departement,
                faculty: this.faculty,
            })
            this.close()
        },
        close() {
            this.dialog = false
            this.$emit('close')
        },
    },
}
</script>
