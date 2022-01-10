import Vue from 'vue'

Vue.mixin({
  methods: {
    trackClickEvent (action, label) {
      this.$gtag('event', 'click', {
        'event_category': action,
        'event_label': label,
        'value': 1
      });
    }
  }
})