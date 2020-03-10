import { createReactionStore } from './reaction';
import { useTodoList } from './useTodoList';
import { useServices } from './useServices';

export const {
  Provider,
  useStore,
  useSelector,
  useImmerState
} = createReactionStore({
  todoList: useTodoList,
  services: useServices
});
0