<template>
    <div class="friends">
        friends
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'Friends',
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