<template>
    <div class="login">
        <div class="loginbox">
            <ul class="login-type">
                <li :class="{ on: loginType == 1 }" @click="selectLoginType(1)">账号登陆</li>
                <!-- <li :class="{ on: loginType == 2 }" @click="selectLoginType(2)">扫码登陆</li> -->
            </ul>
            <div class="login-type-detail">
                <template v-if="loginType == 1">
                    <el-form @keyup.enter.native="submitForm('loginform')" ref="loginform" :model="loginForm" label-width="80px" :rules="rules">
                        <el-form-item label="账号" prop="username">
                            <el-input :disabled="loading || !finish" v-model="loginForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input :disabled="loading || !finish" type="password" autocomplete="off" v-model="loginForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="保持登入" prop="keepLogin">
                            <el-switch v-model="loginForm.keepLogin"></el-switch>
                        </el-form-item>
                        <el-form-item>
                            <el-button :loading="loading || !finish" type="primary" @click="submitForm('loginform')">登陆</el-button>
                            <el-button :disabled="loading || !finish" @click="resetFrom('loginform')">重置</el-button>
                            <el-button :disabled="loading || !finish" type="success" @click="$router.push('/reg')">去注册</el-button>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-if="loginType == 2">
                    <img :src="loginEwmSrc" alt="扫码登陆">
                </template>
            </div>
        </div>
    </div>
</template>
<script>

import MD5 from 'md5';
export default {
    name: 'Login',
    data() {
        return {
            loginType: 1,
            loginEwmSrc: "",
            loginForm: {
                username: '',
                password: '',
                keepLogin: true
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            },
            finish: true
        }
    },
    methods: {
        selectLoginType(type) {
            this.loginType = type;
            if (type == 2) {
                this.getLoginEwm()
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.finish = false;
                    this.$http.post('/login', {
                        username: this.loginForm.username,
                        password: MD5(this.loginForm.password),
                        keepLogin: this.loginForm.keepLogin
                    }).then(data => {
                        if (data.success) {
                            this.$message({
                                message: data.msg,
                                type: 'success',
                                onClose: () => {
                                    this.$router.push('/main/chat');
                                }
                            })
                        }
                    }).catch(err => {
                        this.finish = true;
                    })
                } else {
                    return false;
                }
            });
        },
        resetFrom(formName) {
            this.$refs[formName].resetFields();
        },
        getLoginEwm() {
            this.loginEwmSrc = ""
        },
    },
    computed: {
        loading: function() {
            return this.$store.state.loading.loading
        }
    }
}
</script>
<style lang="scss" scoped>
.loginbox {
    border-radius: 5px;
    width: 40%;
    max-width: 430px;
    min-width: 404px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    overflow: hidden;
    transform: translate(-50%, -50%);
}

.login-type {
    display: flex;
    color: #777;

    li {
        display: inline-block;
        text-align: center;
        padding: 12px 0;
        cursor: pointer;
        font-size: 16px;
        flex: 1;

        &:hover {
            background: #eee;
        }

        &.on {
            background: #eee;
        }
    }
}

.login-type-detail {
    padding: 10px 30px;
}
</style>