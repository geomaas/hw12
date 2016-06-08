var todoTemplate = {
  item: `  <li data-id='<%= _id %>'>
            <input type="checkbox" name="todoitem" value='<%= completed %>' />
            <%= listItem %>
            <button class="edit" type="button" name="button">Edit</button>
            <button class="delete" type="button" name="button">Delete</button>
          </li>
`,
  edit: `
          <li data-id='<%= _id %>'>
            <input type="text" name="name" value="<%= listItem %>">
            <button class"edit" type="button" name="button">Edit</button>
            <button class="delete" type="button" name="button">Delete</button>
          </li>

  `
}
