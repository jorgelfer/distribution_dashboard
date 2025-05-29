class Todo {
  id: string;
  title: string;

  constructor(todoText: string) {
    this.title = todoText;
    this.id = Math.random().toString();
  }
}

export default Todo;
