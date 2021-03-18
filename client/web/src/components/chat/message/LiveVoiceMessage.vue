<template>
    <div class="live-voice-message">
        LiveVoiceMessage
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'LiveVoiceMessage',
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