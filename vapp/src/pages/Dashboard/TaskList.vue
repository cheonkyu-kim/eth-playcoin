<template>
    <base-table :data="tableData"
                thead-classes="text-primary">
      <template slot-scope="{row}">
        <td>
          <base-checkbox v-model="row.done">
          </base-checkbox>
        </td>
        <td>
          <p class="title">{{row.title}}</p>
          <p class="text-muted">{{row.description}}</p>
        </td>
        <td class="td-actions text-right">
          <base-button type="link" aria-label="edit button">
            <i class="tim-icons icon-pencil"></i>
          </base-button>
        </td>
      </template>
    </base-table>
</template>
<script>
  import {BaseTable} from '@/components'
  export default {
    components: {
      BaseTable
    },
    computed: {
      tableData() {
        return  [{
          "title": "토큰 10000개",
          "description": "A 상품",
          "done": false,
        },{
          "title": "토큰, 5000",
          "description": "B 상품",
          "done": false,
        },{
          "title": "토큰, 1000",
          "description": "C 상품",
          "done": false
        }]
      }
    }
  }
</script>
<style>
</style>
