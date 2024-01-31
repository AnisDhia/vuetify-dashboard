<template>
    <v-card>
        <v-navigation-drawer app permanent>
            <!-- expand-on-hover -->
            <v-list>
                <v-list-item class="px-2">
                    <v-list-item-avatar>
                        <v-img :src="photoUrl"></v-img>
                    </v-list-item-avatar>
                </v-list-item>

                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title class="text-h6">
                            {{username}}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list nav dense>
                <v-list-item link to="/">
                    <v-list-item-icon>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/students">
                    <v-list-item-icon>
                        <v-icon>mdi-school</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Students</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/teachers">
                    <v-list-item-icon>
                        <v-icon>mdi-human-male-board</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Teachers</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/groups">
                    <v-list-item-icon>
                        <v-icon>mdi-account-group-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Groups</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/settings">
                    <v-list-item-icon>
                        <v-icon>mdi-cog</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Settings</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/about">
                    <v-list-item-icon>
                        <v-icon>mdi-information</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>About</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script>
    export default {
        name: 'NavRail',

        data: () => ({
            username: 'Anis Dhia',
            email: 'contact@anisdhia.me',
            photoUrl: 'https://randomuser.me/api/portraits/men/10.jpg'
        }),

        methods: {
            //
        },
    }
</script>