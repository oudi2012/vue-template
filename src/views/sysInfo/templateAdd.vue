<template>
  <template-detail :is-edit="false" />
</template>

<script>
import TemplateDetail from './templateDetail'

export default {
  name: 'CreateForm',
  components: { TemplateDetail }
}
</script>
