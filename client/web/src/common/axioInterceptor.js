import _get from 'lodash/get'
import { MessageBox } from 'element-ui'
import Store from '@/store'

const errorAlert = err => {
    const msg = _get(err, 'response.data.msg')
    MessageBox({
        title: '错误',
        message: `${msg}`,
        type: 'error'
    })
}

export default axios => {
    axios.interceptors.request.use(
        config => {
            // console.log(config)
            Store.dispatch("changeLoading", true)
            //增加随机数
            config.params = Object.assign({
                _t: (new Date).getTime()
            }, config.params)
            return config
        }
    )

    axios.interceptors.response.use(
        response => {
            // console.log(response)
            Store.dispatch("changeLoading", false)
            const data = _get(response, 'data')
            return data
        },
        error => {
            Store.dispatch("changeLoading", false)
            let closeAlert = error.config.closeAlert || _get(error, 'config.data') && JSON.parse(_get(error, 'config.data')).closeAlert
            !closeAlert && errorAlert(error)
            return Promise.reject(error)
        }
    )
}