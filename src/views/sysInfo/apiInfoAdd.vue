<template>
  <apiInfo-detail :is-edit="false" />
</template>

<script>
import ApiInfoDetail from './apiInfoDetail'

export default {
  name: 'CreateForm',
  components: { ApiInfoDetail }
}
</script>
