<template>
    <div class="entry">
        
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Entry',
    created() {
        this.$http.get('/user/info', { closeAlert: true }).then(({ data }) => {
            this.setUserInfo(data)
            this.$router.push('/main/chat');
        }).catch(err => {
            this.$router.push('/login');
        })
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(['setUserInfo'])
    },
    computed: mapState({
        loading: state => state.loading.loading
    })
}
</script>
<style lang="scss" scoped>
</style>