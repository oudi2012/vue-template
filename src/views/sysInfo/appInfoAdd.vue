<template>
  <appInfo-detail :is-edit="false" />
</template>

<script>
import AppInfoDetail from './appInfoDetail'

export default {
  name: 'CreateForm',
  components: { AppInfoDetail }
}
</script>
