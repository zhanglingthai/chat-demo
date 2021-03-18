<template>
    <div class="friend-apply-message">
        FriendApplyMessage
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'FriendApplyMessage',
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