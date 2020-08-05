<template>
  <template-item-detail :is-edit="false" />
</template>

<script>
import TemplateItemDetail from './templateItemDetail'

export default {
  name: 'CreateForm',
  components: { TemplateItemDetail }
}
</script>
