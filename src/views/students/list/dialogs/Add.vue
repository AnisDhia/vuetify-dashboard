<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                    Add Student
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Add Student
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-form ref="form">
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="name" label="Full Name" :rules="nameRules"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="dateOfBirth" label="Date of Birth" :rules="dobRules"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="departement" label="Departement" :rules="departementRules"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="email" label="Email" :rules="emailRules"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="phone" label="Phone Number" :rules="phoneRules"></v-text-field>
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
            dateOfBirth: '',
            departement: '',
            email: '',
            phone: '',

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
                    if (/^0[5-6-7]\d{8}$/.test(value)) return true

                    return 'Invalid phone number.'
                }
            ],
            dobRules: [
                (v) => !!v || "Date of Birth is required",
                (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) || "Invalid Date of Birth format (yyyy-mm-dd)",
            ],
            departementRules: [
                (v) => !!v || "Departement is required",
                (v) => v.length > 5 || "Departement ame must be more than 5 characters."
            ]
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()

            if(!this.$refs.form.validate()) {
                alert('Please fill all fields!')
                return
            }

            this.dialog = false
            this.$emit('add-student', {
                name: this.name,
                dateOfBirth: this.dateOfBirth,
                departement: this.departement,
                email: this.email,
                phone: this.phone,
            })
        },
    },
    emits: ['add-student'],
}
</script>