<template>
    <div>
        <v-container>
            <StudentsTable />
        </v-container>
    </div>
</template>

<script>
import StudentsTable from './list/List.vue'

export default {
    name: 'StudentsView',

    components: {
        StudentsTable,
    },
}
</script>
  