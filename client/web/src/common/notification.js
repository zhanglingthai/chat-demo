import Vue from 'vue';

Vue.prototype.$notice = (title, content, iconurl) => {
    Notification.requestPermission().then(function(permission) {
        if (permission == 'granted') {
            var mynotification = new Notification(title, {
                body: content,
                icon: iconurl
            });
            mynotification.onclick = function() {
                alert(content)
                mynotification.close();
            }
        }
    });
};