<template>
    <div class="img-message">
        ImgMessage
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'ImgMessage',
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