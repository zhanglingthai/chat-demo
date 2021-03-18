<template>
    <div class="message-list">
        MessageList
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'MessageList',
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