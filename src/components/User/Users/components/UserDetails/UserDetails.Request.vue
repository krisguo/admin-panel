<template>
  <div class="user-request">
    <template v-if="requestToReview.isPending">
      <div class="app__form-actions user-details-request__form-actions">
        <button
          class="app__btn user-request__btn"
          @click="approve"
          :disabled="isPending"
        >
          Approve
        </button>

        <button
          class="app__btn app__btn--danger user-request__btn"
          @click="showRejectModal"
          :disabled="isPending"
        >
          Reject
        </button>
      </div>
    </template>

    <template v-else-if="requestToReview.isRejected">
      <button
        class="app__btn app__btn--danger user-request__btn"
        @click="reject(true)"
        :disabled="isPending"
      >
        Reject permanently
      </button>
    </template>

    <modal
      class="user-request__reject-modal"
      v-if="rejectForm.isShown"
      @close-request="hideRejectModal()"
      max-width="40rem"
    >
      <form
        class="user-request__reject-form"
        id="user-request-reject-form"
        @submit.prevent="submitRejectForm"
      >
        <div class="app__form-row">
          <text-field
            label="Reject reason"
            :autofocus="true"
            v-model="rejectForm.reason"
          />
        </div>
      </form>

      <div class="app__form-actions">
        <button
          class="app__btn app__btn--danger"
          form="user-request-reject-form"
        >
          Reject
        </button>
        <button
          class="app__btn-secondary"
          @click="hideRejectModal"
        >
          Cancel
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import api from '@/api'

import { TextField } from '@comcom/fields'
import Modal from '@comcom/modals/Modal'

import 'mdi-vue/ChevronDownIcon'
import 'mdi-vue/ChevronUpIcon'

import { ErrorHandler } from '@/utils/ErrorHandler'
import { confirmAction } from '@/js/modals/confirmation_message'

import { ChangeRoleRequest } from '@/api/responseHandlers/requests/ChangeRoleRequest'

const EVENTS = {
  reviewed: 'reviewed',
}

export default {
  name: 'user-details-request',
  components: {
    Modal,
    TextField,
  },

  props: {
    requestToReview: {
      type: ChangeRoleRequest,
      default: _ => new ChangeRoleRequest({}),
    },
    latestApprovedRequest: {
      type: ChangeRoleRequest,
      default: _ => new ChangeRoleRequest({}),
    },
    user: {
      type: Object,
      default: _ => ({}),
    },
  },

  data () {
    return {
      rejectForm: {
        reason: '',
        isShown: false,
      },
      isShownAdvanced: false,
      isPending: false,
    }
  },

  methods: {
    async approve () {
      if (!await confirmAction('Are you sure? This action cannot be undone')) {
        return
      }
      this.isPending = true
      try {
        await api.requests.approve(this.requestToReview.record)
        this.$store.dispatch('SET_INFO', 'Request approved successfully')
        this.$emit(EVENTS.reviewed)
      } catch (error) {
        ErrorHandler.process(error)
      }
      this.isPending = false
    },

    async reject (isPermanent = false) {
      if (!await confirmAction('Are you sure? This action cannot be undone')) {
        return
      }
      this.isPending = true
      const rejectReason = this.rejectForm.reason ||
        this.requestToReview.rejectReason
      try {
        await api.requests.reject(
          { reason: rejectReason, isPermanent },
          {
            ...this.requestToReview.record,
            reviewDetails: { tasksToRemove: 0 },
          }
        )
        this.$store.dispatch('SET_INFO', `Request rejected successfully`)
        this.$emit(EVENTS.reviewed)
      } catch (error) {
        this.isPending = false
        ErrorHandler.process(error)
      }
      this.isPending = false
    },

    showRejectModal () {
      this.rejectForm.reason = ''
      this.rejectForm.isShown = true
    },

    hideRejectModal () {
      this.rejectForm.isShown = false
    },

    async submitRejectForm () {
      this.hideRejectModal()
      await this.reject()
    },
  },
}
</script>

<style scoped>
.user-request__btn {
  width: 15rem;
}
</style>
