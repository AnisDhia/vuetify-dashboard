<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                    Add Teacher
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Add Teacher
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-form ref="form">
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="name" label="Full Name" :rules="nameRules"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="specialty" label="specialty" :rules="specialtyRules"></v-text-field>
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
            specialty: '',
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
            specialtyRules: [
                (v) => !!v || "specialty is required",
                (v) => v.length >=3 || "Invalid specialty",
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
            this.$emit('add-teacher', {
                name: this.name,
                specialty: this.specialty,
                departement: this.departement,
                email: this.email,
                phone: this.phone,
            })
        },
    },
    emits: ['add-teacher'],
}
</script>