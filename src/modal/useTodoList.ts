import { useImmerState } from '.';
import { useCallback } from 'react';

export type TodoListItem = {
  id: number;
  name: string;
  desc: string;
};
export function useTodoList() {
  const [todoList, setTodoList] = useImmerState<TodoListItem[]>([]);

  const addItem = useCallback(
    (item: TodoListItem) => {
      setTodoList(newTodoList => {
        newTodoList.push(item);

        return newTodoList;
      });
    },
    [setTodoList]
  );

  const removeItem = useCallback(
    (id: number) => {
      setTodoList(newTodoList => {
        newTodoList = newTodoList.filter(item => item.id !== id);
        return newTodoList;
      });
    },
    [setTodoList]
  );

  const clear = useCallback(() => {
    setTodoList(newTodoList => {
      newTodoList = [];
      return newTodoList;
    });
  }, [setTodoList]);

  return {
    todoList,
    addItem,
    removeItem,
    clear
  };
}
