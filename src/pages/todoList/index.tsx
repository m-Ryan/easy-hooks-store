import React, { useCallback } from 'react';
import { useSelector } from '../../modal';

export function TodoList() {
  const { todoList, addItem, removeItem } = useSelector('todoList');

  const addTodoList = useCallback(() => {
    const id = Math.max(...todoList.map(item => item.id), 0) + 1;
    addItem({
      id,
      name: `todo${id}`,
      desc: `descd${id}`
    });
  }, [addItem, todoList]);

  const onRemove = useCallback(
    (id: number) => {
      removeItem(id);
    },
    [removeItem]
  );

  return (
    <div>
      <h2>
        代办事项清单：<button onClick={addTodoList}>添加</button>
      </h2>
      <ul>
        {todoList.map(item => (
          <div key={item.id}>
            name: {item.name}
            &emsp;&emsp;&emsp; desc: {item.desc}
            <button onClick={() => onRemove(item.id)}>删除</button>
          </div>
        ))}
      </ul>
      <TodoListDetail />
    </div>
  );
}

function TodoListDetail() {
  const { todoList, clear } = useSelector('todoList');
  return (
    <div>
      待办事项共{todoList.length}件 &emsp;&emsp;&emsp;
      <button onClick={clear}>清空全部</button>
    </div>
  );
}
