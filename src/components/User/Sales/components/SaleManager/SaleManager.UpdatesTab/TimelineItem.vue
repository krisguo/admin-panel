<template>
  <div class="timeline-item">
    <h2 class="timeline-item__title">
      {{ title }}
    </h2>
    <date-formatter
      :date="date"
      format="DD MMM YYYY HH:mm:ss"
      class="timeline-item__date"
    />

    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="timeline-item__message" v-html="linkify(message)" />
  </div>
</template>

<script>
import { DateFormatter } from '@comcom/formatters'

export default {
  name: 'updates-timeline-item',
  components: {
    DateFormatter,
  },

  props: {
    title: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String, required: true },
  },

  methods: {
    linkify (text) {
      /*eslint-disable*/
        const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
        /* eslint-enable */
      return text.replace(urlRegex, (url) => '<a href="' + url + '" target="_blank">' + url + '</a>')
    },
  },
}
</script>

<style lang="scss" scoped>
.timeline-item__date {
  font-weight: bold;
}

.timeline-item__title {
  margin-bottom: 0.75rem;
}

.timeline-item {
  margin-bottom: 2rem;
}
</style>
