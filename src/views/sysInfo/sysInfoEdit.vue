<template>
  <sysInfo-detail :is-edit="true" />
</template>

<script>
  import SysInfoDetail from './sysInfoDetail'

  export default {
    name: 'EditForm',
    components: { SysInfoDetail }
  }
</script>
