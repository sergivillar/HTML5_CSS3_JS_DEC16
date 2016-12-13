function sendNotification(msg, body) {
	var notification = Notification || mozNotification || webkitNotification;

	if (body) {
		var options = {
			'body': body
		};
	}

	if (typeof(notification) === 'undefined') {
		console.error("Notificaciones no soportadas");
	} else {
		notification.requestPermission(function(permission){
			if (Notification.permission === 'granted') {
				var notification = new Notification(msg, options);
			}
		});	
	}
}