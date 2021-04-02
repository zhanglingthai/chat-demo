// import Vue from 'vue'

// let service = {}

// const modulesFiles = require.context('./modules', true, /\.js$/)
// modulesFiles.keys().reduce((modules, modulePath) => {
//     const moduleName = `${modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')}`
//     const value = modulesFiles(modulePath)
//     service[moduleName] = new value.default;
// }, {})


// service.install = Vue => {
//     Object.keys(service).map((key) => {
//         Vue.prototype[`${key}Service`] = service[key];
//     })
// }

// export default service