<template>
  <queue-info-detail :is-edit="true" />
</template>

<script>
import QueueInfoDetail from './queueInfoDetail'

export default {
  name: 'EditForm',
  components: { QueueInfoDetail }
}
</script>
