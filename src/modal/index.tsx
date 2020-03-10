import { createReactionStore } from './reaction';
import { useTodoList } from './useTodoList';

export const {
  Provider,
  useStore,
  useSelector,
  useImmerState
} = createReactionStore({
  todoList: useTodoList
});
