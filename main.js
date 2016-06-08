$(document).ready(function() {
  todoPage.init();
})

var todoPage = {
  url: 'http://tiny-tiny.herokuapp.com/collections/muchTodoAboutNothing',
  todo: [],
  init: function() {
    todoPage.styling();
    todoPage.events();
  },
  styling: function() {
    todoPage.getTodo();
  },
  events: function() {

    $('.todoSubmit').on('click',function(){
      var newTodoStr = '<li><input type="checkbox" name="todoitem" value="completed">'
		  var todoInput = $('.todoInput').val();
		  console.log(todoInput);
      newTodoStr += todoInput + '<button type="button" name="button">Edit</button><button type="button" name="button">Delete</button></li>';
      // console.log(newTodoStr);
      $('.todoCards ul').append(newTodoStr);
      $('.todoInput').val("");
	});
  },

  createTodo: function(todo) {

    $.ajax({
      url: todoPage.url,
      method: "POST",
      data: todo,
      success: function(data) {
        console.log("WE CREATED SOMETHING", data);
        var htmlStr = todoPage.htmlGenerator(todoTemplate.check,data)
        todoPage.todo.push(data);
        $('.todoCards > ul').append(htmlStr);

      },
      error: function(err) {
        console.error("OH CRAP", err);
      }
    })
  },
  // updateBlog: function(blog) {
  //
  //   $.ajax({
  //     method: 'PUT',
  //     url: blogPage.url + "/" + blog.id,
  //     data: blog,
  //     success: function(data) {
  //       console.log("UPDATED SUCCESSFULLY!!!", data);
  //       blogPage.getBlogs();
  //     },
  //     error: function(err) {
  //       console.error("I HAVE NO IDEA WHATS GOIGN ON", err);
  //     }
  //   })
  // },

  getTodo: function() {
    $.ajax({
      url: todoPage.url,
      method: "GET",
      success: function(data) {
        console.log("WE GOT SOMETHING", data);
        // $('.todoCards ul').html("");
        data.forEach(function(element,idx) {
          var todoHtmlStr = todoPage.htmlGenerator(todoTemplates.check,element);
          $('.todoCards ul').append(todoHtmlStr)
          todoPage.todo.push(element);
        });
      },
      error: function(err) {
        console.error("OH CRAP", err);
      }
    })
  },
  // deleteBlog: function(blogId) {
  //   // find blog to delete from our blog data;
  //   var deleteUrl = blogPage.url + "/" + blogId;
  //   $.ajax({
  //     url: deleteUrl,
  //     method: "DELETE",
  //     success: function(data) {
  //       console.log("WE DELETED SOMETHING", data);
  //       blogPage.getBlogs();
  //     },
  //     error: function(err) {
  //       console.error("OH CRAP", err);
  //     }
  //   })
  // },
  templification: function(template) {
       return _.template(template);
     },

  htmlGenerator: function(template,data) {
     var tmpl = todoPage.templification(template);
     return tmpl(data);
     }


};
