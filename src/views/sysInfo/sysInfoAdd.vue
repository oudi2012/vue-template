<template>
  <sysInfo-detail :is-edit="false" />
</template>

<script>
import SysInfoDetail from './sysInfoDetail'

export default {
  name: 'CreateForm',
  components: { SysInfoDetail }
}
</script>
