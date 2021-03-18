<template>
    <div class="inputbox">
        InputBox
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'InputBox',
    components: {

    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: mapState({
        loading: state => state.loading.loading
    })
}
</script>
<style lang="scss" scoped>
</style>