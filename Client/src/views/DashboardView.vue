<script>
  import { useLayout } from 'vuetify'

  const Child = {
    setup (props, ctx) {
      const { getLayoutItem } = useLayout()

      function print (key) {
        alert(JSON.stringify(getLayoutItem(key), null, 2))
      }

      return () => ctx.slots.default({ print })
    },
  }

  export default {
    components: { Child },
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },
  };
</script>

<template>

  <v-layout ref="app" class="rounded rounded-md">

    <v-navigation-drawer
      color="grey-darken-2"
      name="drawer"
      permanent
    >
    </v-navigation-drawer>

      <!--Quote to remind the reason of why user wants to quit vape-->
    <v-main style="min-height: 100vh;">
      <v-card
    class="mx-auto my-4"
    prepend-icon="mdi-comment-quote-outline"
    style="width: 80%;"
  >
    <template v-slot:title>
      <div style="font-size: 18px;">
      Remember why you want to quit vape
      </div>
    </template>

    <v-card-text>
      This is content
    </v-card-text>
  </v-card>

  <!--Blog-->
  <v-carousel
    height="400"
    show-arrows="hover"
    cycle
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
        
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>

    </v-main>

    <v-footer
      name="footer"
      app
    >
    
    </v-footer>
  </v-layout>
</template>





