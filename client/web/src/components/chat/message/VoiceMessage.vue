<template>
    <div class="voice-message">
        VoiceMessage
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'VoiceMessage',
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