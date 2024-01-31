<template>
  <v-container>
    <v-row no-gutter>
      <v-col cols="6">
        <v-card elevation="2" shaped>
            <v-card-title>Card 1</v-card-title>
            <v-card-subtitle>subtitle</v-card-subtitle>
            <v-card-text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur voluptas maiores laboriosam
              laudantium distinctio quas quae, iure vitae qui ut officia deleniti iste earum perspiciatis velit nihil
              dignissimos corrupti dolores.</v-card-text>
            <v-card-actions>
              <v-btn text>See more</v-btn>
              <v-btn text>Remove</v-btn>
            </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <h4 class="subheading mb-12">Thank you for running Vuetify.</h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {

  components: {
  },

  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
}
</script>
