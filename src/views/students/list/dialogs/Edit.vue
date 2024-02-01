<template>
    <v-dialog :value="dialog" @input="close" max-width="500px" @click:outside="close" >
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
                                <v-text-field v-model="dateOfBirth" label="Date of Birth" :rules="dobRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="departement" label="Departement"
                                    :rules="departementRules"></v-text-field>
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
        student: {
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
        };
    },
    created() {  
        this.name = this.student.name
        this.dateOfBirth = this.student.dateOfBirth
        this.departement = this.student.departement
        this.email = this.student.email,
            this.phone = this.student.phone
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        student() {
            this.name = this.student.name
            this.dateOfBirth = this.student.dateOfBirth
            this.departement = this.student.departement
            this.email = this.student.email,
                this.phone = this.student.phone
        }
    },
    methods: {
        save() {
            this.student.name = 'test'
            this.$emit('save', {
                id: this.student.id,
                name: this.name,
                dateOfBirth: this.dateOfBirth,
                departement: this.departement,
                email: this.email,
                phone: this.phone,
            })
        },
        close() {
            this.$emit('close-edit')
        },
    },
}
</script>
