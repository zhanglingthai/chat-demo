import Vue from 'vue';

import {
    MessageBox,
    Message,
    Button,
    Switch,
    Form,
    FormItem,
    Input
} from 'element-ui';


Vue.use(Button);
Vue.use(Switch);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;