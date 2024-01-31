<template>
    <div>
        <v-container>
            <TeachersTable />
        </v-container>
    </div>
</template>

<script>
import TeachersTable from './list/List.vue'

export default {
    name: 'TeachersView',

    components: {
        TeachersTable,
    },
}
</script>