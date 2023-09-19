interface Board {
  columns: Map<string, string>;
}

type TypedColumn = "todo" | "inprogress" | "done";

interface Column {
  id: string;
  todos: Todo[];
}

interface Todo {
  id: string;
  //   $createdAt: string;
  title: string;
  status: TypedColumn;
}
