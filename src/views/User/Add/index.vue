<template>
    <AddUI :updateFormDatas="updateFormDatas" :flag="flag"></AddUI>
</template>

<script>
import AddUI from '../../../components/AddUI.vue'
export default {
    components: { AddUI },
    data() {
        return {
            flag:false,
            updateFormDatas:{},
        }
    },

}
</script>

<style></style>