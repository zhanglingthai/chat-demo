<template>
    <div class="sys-message">
        SysMessage
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'SysMessage',
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