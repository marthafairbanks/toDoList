$(document).ready(function() {
	$("input").focus();

	//constructor for toDoArray
	function toDoItem(value,isComplete){
	  this.value = value;
	  this.isComplete = isComplete;
	}

	var toDoArray = []; 

	//on submit form (enter) grabs the user inputs and calls the function writeToDos
	$('form').on("submit",function(event){
		event.preventDefault();

		var content = $(".new-todo").val();
		var newToDo = new toDoItem(content,false);
		toDoArray.push(newToDo);
		$(".new-todo").val('');
	
		writeToDos();
	})
	
	//processes the input and writes the info to html, 
	//if the item is complete gives the item class 'completed', 
	//updates the count of list items left to be completed 
	function writeToDos() {
	 	$(".items").children().remove();
	  
	 	toDoArray.forEach(function(toDoArray){
	 		if (toDoArray.isComplete === false) {
	    		$(".items").append("<li><article><button class='check'></button><p>" + toDoArray.value + "</p><button class='delete'>X</button></article></li>");
		  	}
			else {
	    		$(".items").append("<li><article class='completed'><button class='check'></button><p>" + toDoArray.value + "</p><button class='delete'>X</button></article></li>");
			}
	  	});
	  	 
	  	itemCount();
	}
	
	// updates the "items left" counter and writes it to html, gets called on writeToDos()
	function itemCount() {
		var counter = 0;
		toDoArray.forEach(function(toDoArray) {
			if (toDoArray.isComplete === false) {
				counter += 1;
			}
		})
		$("span").html(counter);
	}

	//on the delete click, removes the list item from the array, calls the function writeToDos
	$('body').on("click", ".delete", function() {
		
		var content = $(this).parent().find('p').text();

		toDoArray.forEach(function(todo,index) {

			if (todo.value === content){
				toDoArray.splice(index,1);
			}
		})
	
		writeToDos();
	})

	//on the check click toggles array property 'isComplete' from false to true, calls function writeToDos
	$('body').on("click", ".check", function() {
		
		var content = $(this).parent().find('p').text();
		
		toDoArray.forEach(function(toDoArray){

			if (toDoArray.value === content && toDoArray.isComplete === false) {
				toDoArray.isComplete = true;
			}
			else if (toDoArray.value === content && toDoArray.isComplete === true) {
			 	toDoArray.isComplete = false;
			}
	
		writeToDos();
		});	
	});

	//shows all list items
	//removes class 'active' from other two buttons and gives it to this one
	$(".show-all").click(function(){
		writeToDos();
		$("button").removeClass("active");		
		$(this).addClass("active");

	})

	//shows only the items left to do when the "active" button is clicked, 
	//removes class 'active' from other two buttons and gives it to this one
	$(".show-active").click(function(){

		$("button").removeClass("active");		
		$(this).addClass("active");

		$(".items").children().remove();
		
		toDoArray.forEach(function(toDoArray){
				if (toDoArray.isComplete === false) {
					$(".items").append("<li><article><button class='check'></button><p>" + toDoArray.value + "</p><button class='delete'>X</button></article></li>");				
				}
		})
	})

	//shows only the items completed when the "completed" button is clicked
	//removes class 'active' from other two buttons and gives it to this one
	$(".show-completed").click(function(){

		$("button").removeClass("active");		
		$(this).addClass("active");

		$(".items").children().remove();
		
		toDoArray.forEach(function(toDoArray){
				if (toDoArray.isComplete === true) {
					$(".items").append("<li><article class='completed'><button class='check'></button><p>" + toDoArray.value + "</p><button class='delete'>X</button></article></li>");				
				}
		})
	})	
});
