var todoTemplate = {
  item: `  <li data-id='<%= _id %>'>
            <input type="checkbox" name="todoitem" value='<%= completed %>' />
            <%= listItem %>
            <button class="edit" type="button" name="button">Edit</button>
            <button class="delete" type="button" name="button">Delete</button>
          </li>
`,
  edit: `
          <li id="edit-fields" data-id='<%= _id %>'>
            <input type="text" name="name" value="">
            <button class="update" type="button" name="button">Update</button>

          </li>

  `
}
