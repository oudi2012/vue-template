<template>
  <file-type-detail :is-edit="true" />
</template>

<script>
import FileTypeDetail from './fileTypeDetail'

export default {
  name: 'EditForm',
  components: { FileTypeDetail }
}
</script>
