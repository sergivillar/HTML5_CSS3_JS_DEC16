$(document).ready(function() {
	var API_URL = 'http://localhost:8000/api/';
	var tasks = [];
	var newTaskInput = $('#newTaskName');
	var tasksContainer = $('#tasksContainer');
	var loader = $('.loader');

	var drawTasks = function () {
		tasksContainer.empty();

		if (tasks.length == 0) {
			tasksContainer.append('<li class="task-item">No tienes tareas pendientes</li>');
		} else {
			var contentToAdd = '';

			for (var i = 0; i < tasks.length; i++) {
				contentToAdd += '<li class="task-item"><input type="text" class="update-task-input" value="' + tasks[i].name + '" required><button class="deleteTask" data-task-id="' + tasks[i].id + '">Eliminar</button></li>';
			}

			tasksContainer.append(contentToAdd);
		}
	};

	var createTask = function (name) {
		var success = function(data) {
			newTaskInput.val('');
			tasks.push(data);
			drawTasks();
		};

		var data = {
			'name': name
		};

		$.ajax({
			type: "POST",
			url: API_URL + "tasks",
			data: data,
			success: success
		})
		.fail(function (error) {
			console.error("Error creando tarea.", error);
		});
	}

	var getTasks = function () {
		var success = function(data) {
			tasks = data;
			drawTasks();
		}

		var error = function(error) {
			console.error("Error cargando tareas.", error);
		} 

		var complete = function(object, textStatus) {
			loader.fadeOut();
			if (textStatus == 'error') {
				console.log("Ha habido un error, revisalo.");
			} else {
				console.log("Todo ha ido de forma correcta.")
			}
		}

		var beforeSend = function() {
			console.log("Before send");
			loader.show();
		}

		$.ajax({
			type: "GET",
			url: API_URL + "tasks",
			success: success,
			error: error,
			complete: complete,
			beforeSend: beforeSend
		});
	}

	var deleteTask = function(id) {
		$.ajax({
			type: "DELETE",
			url: API_URL + "tasks/" + id
		})
		.done(function(data){
			tasks = $.grep(tasks, function(item){
				return item.id != id;
			});

			drawTasks();
		})
		.fail(function(error) {
			console.error("Error eliminando tarea", error);
		})
		.always(function(object, status, error){
			console.log(object, status, error);
		});
	}

	var updateTask = function(id, name) {
		var data = {
			'name': name
		}

		$.ajax({
			type: "PUT",
			url: API_URL + "tasks/" + id,
			data: data
		})
		.done(function(data){
			for (var i = 0; i < tasks.length; i++){
				if(tasks[i].id == id) {
					tasks[i].name = name;
				}
			}

			drawTasks();
		})
		.fail(function(error) {
			console.error("Error actualizando tarea", error);
		}) 
	}


	$('#sendNewTask').on("click", function(event){
		if (newTaskInput.val() != '') {
			event.preventDefault();
			createTask(newTaskInput.val());
		}
	});

	$(document).on("click", ".deleteTask", function(event){
		var id = $(this).data('taskId');
		deleteTask(id);
	});

	$(document).on("blur", ".update-task-input", function(event){
		var newName = $(this).val();
		var id = $(this).siblings('.deleteTask').data("taskId");
		updateTask(id, newName);
	});

	$(document).dblclick(function(event){
		console.log("Has puslado la tecla " + event.which);
	})

	setTimeout(function() {
		getTasks();
	}, 1);
});