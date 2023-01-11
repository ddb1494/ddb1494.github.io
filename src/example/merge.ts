// interface : Pick, Omit
export interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview1 = Pick<Todo, 'title' | 'completed'>;// 선택 후 { title, completed }
type TodoPreview2 = Omit<Todo, 'description'>;// 제거 후 { title, completed }


// type : Extract, Exclude
export type TodoProperty = keyof Todo;// 'title' | 'description' | 'completed'

type TodoProperty1 = Extract<TodoProperty, 'description' | 'not'>;// 선택 후 'description'
type TodoProperty2 = Exclude<TodoProperty, 'description' | 'not'>;// 제거 후 'title' | 'completed'


// 뭐지?
type TodoProperty3 = Omit<TodoProperty, 'description' | 'not'>;// 제거 후 'title' | 'completed'



