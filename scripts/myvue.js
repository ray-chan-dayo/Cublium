Vue.component('hello-vue', {
    template: '<div id="header">HEAD</div>',
})

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello, Vue!'
    }
})

