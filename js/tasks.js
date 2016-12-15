$(document).ready(function() {
	var API_URL = 'http://localhost:8000/api/';
	var tasks = [];
	var newTaskInput = $('#newTaskName');
	var tasksContainer = $('#tasksContainer');


	var drawTasks = function () {
		tasksContainer.empty();

		if (tasks.length == 0) {
			tasksContainer.append('<li class="task-item">No tienes tareas pendientes</li>');
		} else {
			var contentToAdd = '';

			for (var i = 0; i < tasks.length; i++) {
				contentToAdd += '<li class="task-item">' + tasks[i].name + '<button class="deleteTask" data-task-id="' + tasks[i].id + '">Eliminar</button></li>';
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
			if (textStatus == 'error') {
				console.log("Ha habido un error, revisalo.");
			} else {
				console.log("Todo ha ido de forma correcta.")
			}
		}

		$.ajax({
			type: "GET",
			url: API_URL + "tasks",
			success: success,
			error: error,
			complete: complete
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

	getTasks();
});