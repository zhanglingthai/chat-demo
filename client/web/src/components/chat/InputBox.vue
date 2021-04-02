<template>
    <div class="inputbox">
        <div class="ctrl">
        </div>
        <div class="msginput">
            <textarea @keydown="keyborderCtrl($event)" name="" id="" cols="80" rows="4" v-model="textContent"></textarea>
            <!-- <el-form @keyup.up="lineFeed()" @keyup.enter.native="submitForm('sendmsg')" ref="msgform" :model="msgForm">
                    <el-input resize="none" :autosize="{ minRows: 4, maxRows: 6}" rows="4" show-word-limit minlength="1" maxlength="500" v-model="msgForm.textContent" type="textarea"></el-input>
            </el-form> -->
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import chatService from '@/service/modules/chat'
export default {
    name: 'InputBox',
    components: {

    },
    data() {
        return {
            toUid:123,
            textContent: ''
        }
    },
    methods: {
        submitForm(formName) {
            chatService.sendMsg(this.textContent, this.toUid)
            this.textContent = ''
        },
        keyborderCtrl(e) {
            if (e.keyCode == 13 && e.ctrlKey || e.keyCode == 13 && e.metaKey) {
                this.textContent = this.textContent + '\n'
            } else if (e.keyCode === 13) {
                this.submitForm()
                e.preventDefault()
                return false
            }

        }
    },
    computed: mapState({
        loading: state => state.loading.loading
    })
}
</script>
<style lang="scss" scoped>
.inputbox {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}

.ctrl {
    height: 40px;
    border-top: 1px solid #eee;
}

.msginput {
    width: 100%;
}

textarea {
    display: block;
    font-size: 18px;
    color: #888;
    width: 100%;
    border: none;
    padding: 5px 10px;
    box-sizing: border-box;

    &:focus {
        border: none;
        outline: none;
    }
}
</style>