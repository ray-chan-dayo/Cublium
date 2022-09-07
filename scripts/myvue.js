Vue.component('hello-vue', {
    template: '<div id="header"><div id="prod_name">HEAD</div></div>',
})

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello, Vue!'
    }
})
