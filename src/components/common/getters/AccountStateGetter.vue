<template>
  <span class="account-state-getter">
    <template v-if="accountState">
      {{ accountState }}
    </template>
    <template v-else>
      Loading...
    </template>
  </span>
</template>

<script>
import { Sdk } from '@/sdk'

export default {
  props: {
    accountId: { type: String, required: true },
  },

  data: _ => ({
    account: null,
  }),

  computed: {
    accountState () {
      if (!this.account) return null
      return this.account.isBlocked ? 'Blocked' : 'Active'
    },
  },

  async created () {
    await this.getAccount()
  },

  methods: {
    async getAccount () {
      const response = await Sdk.horizon.account.get(this.accountId)
      this.account = response.data
    },
  },
}
</script>
