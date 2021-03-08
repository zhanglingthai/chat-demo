<template>
    <div class="login">
        <div class="loginbox">
            <ul class="login-type">
                <li :class="{ on: loginType == 1 }" @click="selectLoginType(1)">账号登陆</li>
                <li :class="{ on: loginType == 2 }" @click="selectLoginType(2)">扫码登陆</li>
            </ul>
            <div class="login-type-detail">
                <div v-if="loginType == 1">
                    <ul>
                        <li>账号：<input type="text"></li>
                        <li>密码：<input type="password"></li>
                        <li>验证码：<input type="text"></li>
                    </ul>
                </div>
                <div v-if="loginType == 2">
                    <img :src="loginEwmSrc" alt="扫码登陆">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    components: {

    },
    data() {
        return {
            loginType: 1,
            loginEwmSrc: ""
        }
    },
    created() {
    	
    },
    mounted() {
    	this.getTest()
    },
    methods: {
        selectLoginType(type) {
            this.loginType = type;
            if(type == 2){
            	this.getLoginEwm()
            }
        },
        getLoginEwm() {
            this.loginEwmSrc = ""
        },
        getTest(){
        	return this.$http.post('/test',{}).then(resp =>{
        		console.log(resp.data);
        	})
        }
    }
}
</script>
<style lang="scss">
.loginbox {
    border-radius: 5px;
    width: 40%;
    max-width: 380px;
    min-width: 240px;
    height: 60%;
    max-height: 430px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    overflow: hidden;
    transform: translate(-50%, -50%);
}

.login-type {
    li {
        display: inline-block;
        width: 50%;
        text-align: center;
        padding: 12px 0;
        cursor: pointer;
        font-size: 16px;

        &:hover {
            background: #eee;
        }

        &.on {
            background: #eee;
        }
    }
}
</style>