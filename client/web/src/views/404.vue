<template>
    <div class="page404">
        404
    </div>
</template>
<script>
import { Button } from 'element-ui';

export default {
    name: 'Page404',
    components: {

    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        loading: function() {
            return this.$store.state.loading.loading
        }
    }
}
</script>
<style lang="scss">
</style>