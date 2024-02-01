<template>
    <div>
        <v-container>
            <TrainingsTable />
        </v-container>
    </div>
</template>

<script>
import TrainingsTable from './list/List.vue'

export default {
    name: 'TrainingsView',

    components: {
        TrainingsTable,
    },
}
</script>