<template>
  <div class="master-assets-show">
    <div class="master-assets-show__block app__block">
      <h2>Manage {{ asset }}</h2>

      <div class="master-assets-show__manager-wrp">
        <asset-manager :asset-code="asset" />
      </div>
    </div>
  </div>
</template>

<script>
import AssetManager from './components/AssetManager'

export default {
  components: {
    AssetManager,
  },
  props: {
    asset: { type: String, required: true },
  },
}
</script>

<style scoped>
.master-assets-show__block.app__block {
  max-width: 64rem;
}
</style>
