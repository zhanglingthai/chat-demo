<template>
    <div class="reg">
        <div class="regbox">
            <ul class="reg-type">
                <li :class="{ on: regType == 1 }" @click="selectregType(1)">账号注册</li>
                <!-- <li :class="{ on: regType == 2 }" @click="selectregType(2)">扫码登陆</li> -->
            </ul>
            <div class="reg-type-detail">
                <template v-if="regType == 1">
                    <el-form @keyup.enter.native="submitForm('regform')" ref="regform" :model="regForm" label-width="80px" :rules="rules">
                        <el-form-item label="账号" prop="username">
                            <el-input :disabled="loading || !finish" v-model="regForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input :disabled="loading || !finish" type="password" autocomplete="off" v-model="regForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input :disabled="loading || !finish" type="password" autocomplete="off" v-model="regForm.checkPass"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button :loading="loading || !finish" type="primary" @click="submitForm('regform')">注册</el-button>
                            <el-button :disabled="loading || !finish" @click="resetFrom('regform')">重置</el-button>
                            <el-button :disabled="loading || !finish" type="success" @click="$router.push('/login')">去登录</el-button>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-if="regType == 2">
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import MD5 from 'md5';


export default {
    name: 'Reg',
    data() {
        const checkPsw = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.regForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            regType: 1,
            regForm: {
                username: '',
                password: '',
                checkPass: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: checkPsw, trigger: 'blur' }
                ]
            },
            finish: true
        }
    },
    methods: {
        selectRegType(type) {
            this.regType = type;
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.finish = false;
                    this.$http.post('/reg', {
                        username: this.regForm.username,
                        password: MD5(this.regForm.password)
                    }).then(data => {
                        if (data.success) {
                            this.$message({
                                message: data.msg,
                                type: 'success',
                                onClose: () => {
                                    this.$router.push('/login');
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
        }
    },
    computed: {
        loading: function() {
            return this.$store.state.loading.loading
        }
    }
}
</script>
<style lang="scss">
.regbox {
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

.reg-type {
    color: #777;
    display: flex;

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

.reg-type-detail {
    padding: 10px 30px;
}
</style>