<template>
  <appInfo-detail :is-edit="true" />
</template>

<script>
import AppInfoDetail from './appInfoDetail'

export default {
  name: 'EditForm',
  components: { AppInfoDetail }
}
</script>
