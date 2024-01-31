<template>
    <div>
        <v-dialog :value="dialog" max-width="500px" @click:outside="closeDelete">
            <!-- <template v-slot:activator="{ on, attrs }">
                <v-icon small @click="deleteStudent" v-bind="attrs" v-on="on">
                    mdi-delete
                </v-icon>
            </template> -->
            <v-card>
                <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'DeleteDialog',
    props: {
        dialog: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            // dialogDelete: dialog,
            valid: false
        };
    },
    methods: {
        deleteItemConfirm() {
            // Delete the student data
            // You can emit an event or call an API to delete the student record
            this.$emit('delete-teacher')
        },
        closeDelete() {
            this.$emit('close-delete')
        }
    }
};
</script>