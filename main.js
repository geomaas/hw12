$(document).ready(function() {
  todoPage.init();
})
// debugger
var todoPage = {
  url: 'http://tiny-tiny.herokuapp.com/collections/muchTodoAboutNothing',
  todo: [],
  init: function() {
    todoPage.styling();
    todoPage.events();
  },
  styling: function() {
    todoPage.getTodo();
    // console.log(getTodo);
  },
  events: function() {

    $('.todoSubmit').on('click',function(){
      console.log("SUBMITTED");
      // var newTodoStr = '<li><input type="checkbox" name="todoitem" value="completed">'
		  var todoInput = $('.todoInput').val();
      var objectToSaveToDatabase = {
        listItem: todoInput,
        completed: false
      }

      todoPage.createTodo(objectToSaveToDatabase)
		  // console.log(todoInput);
      // newTodoStr += todoInput + '<button type="button" name="button">Edit</button><button type="button" name="button">Delete</button></li>';
      // // console.log(newTodoStr);
      // $('.todoCards ul').append(newTodoStr);
      $('.todoInput').val("");
  	})
    // delete function
    $('.todoCards').on('click','.delete', function(event) {
     event.preventDefault();
     var todoId = $(this).parent().data('id');
     console.log(todoId);
     todoPage.deleteTodo(todoId);
   })

   // Show Edit Fields
   $('.todoCards').on('click','.edit',function(event) {
     event.preventDefault();
     var that = this;
     $.ajax({
       method: 'GET',
       url: todoPage.url + "/" + $(that).parent().data('id'),
       success: function(data) {
         var htmlToAppend = todoPage.htmlGenerator(todoTemplate.edit,data)
         $(that).parent().append(htmlToAppend)
        //  console.log($(that).parent());
       },
       error: function(err) {
         console.error("NO LIKEY", err);
       }
     })

   })
  },


  createTodo: function(todo) {

    $.ajax({
      url: todoPage.url,
      method: "POST",
      data: todo,
      success: function(data) {
        console.log("WE CREATED SOMETHING", data);
        var htmlStr = todoPage.htmlGenerator(todoTemplate.item,data)
        todoPage.todo.push(data);
        console.log(htmlStr);
        $('.todoCards > ul').append(htmlStr);

      },
      error: function(err) {
        console.error("OH CRAP", err);
      }
    })
  },
  updateTodo: function(todo) {

    $.ajax({
      method: 'PUT',
      url: todoPage.url + "/" + todo.id,
      data: blog,
      success: function(data) {
        console.log("UPDATED SUCCESSFULLY!!!", data);
        todoPage.getTodo();
      },
      error: function(err) {
        console.error("I HAVE NO IDEA WHATS GOIGN ON", err);
      }
    })
  },

  getTodo: function() {
    $.ajax({
      url: todoPage.url,
      method: "GET",
      success: function(data) {
        // console.log("WE GOT SOMETHING", data);
        // $('.todoCards ul').html("");
        $('.todoCards ul').html('');
        data.forEach(function(element,idx) {
          var todoHtmlStr = todoPage.htmlGenerator(todoTemplate.item,element);
          $('.todoCards ul').append(todoHtmlStr)
          todoPage.todo.push(element);
        });
      },
      error: function(err) {
        console.error("OH CRAP", err);
      }
    })
  },
  deleteTodo: function(todoId) {
    // find blog to delete from our blog data;
    var deleteUrl = todoPage.url + "/" + todoId;
    $.ajax({
      url: deleteUrl,
      method: "DELETE",
      success: function(data) {
        console.log("WE DELETED SOMETHING", data);
        todoPage.getTodo();
      },
      error: function(err) {
        console.error("OH CRAP", err);
      }
    })
  },
  templification: function(template) {
       return _.template(template);
     },

  htmlGenerator: function(template,data) {
     var tmpl = todoPage.templification(template);
     return tmpl(data);
     }


};
