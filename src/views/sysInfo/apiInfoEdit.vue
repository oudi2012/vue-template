<template>
  <apiInfo-detail :is-edit="true" />
</template>

<script>
import ApiInfoDetail from './apiInfoDetail'

export default {
  name: 'EditForm',
  components: { ApiInfoDetail }
}
</script>
