<template>
  <div class="limits-requests">
    <template v-if="list.data && list.data.length">
      <limits-list :list="list.data" />
    </template>
    <template v-else>
      <ul class="app-list">
        <li class="app-list__li-like">
          <template v-if="isLoading">
            Loading...
          </template>
          <template v-else>
            Nothing here yet
          </template>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import LimitsList from './components/Limits.RequestList'

import api from '@/api'
import { REQUEST_STATES } from '@/constants'

import { ErrorHandler } from '@/utils/ErrorHandler'

export default {
  components: { LimitsList },

  data: _ => ({
    list: {},
    accountTypeList: {},
    isLoading: false,
  }),

  async created () {
    await this.getList()
  },

  methods: {
    async getList () {
      this.isLoading = true
      try {
        this.list = await api.requests.getLimitsUpdateRequests({
          state: REQUEST_STATES.pending,
        })
      } catch (error) {
        ErrorHandler.processWithoutFeedback(error)
      }
      this.isLoading = false
    },
  },
}
</script>
