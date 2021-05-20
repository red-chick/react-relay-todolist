import { Suspense } from "react";
import {
  loadQuery,
  PreloadedQuery,
  RelayEnvironmentProvider,
  usePreloadedQuery,
} from "react-relay";
import graphql from "babel-plugin-relay/macro";
import hash from "object-hash";

import environment from "../../environment";
import { TodoListQuery } from "../../__generated__/TodoListQuery.graphql";

import Todo from "./TodoList/Todo";

const query = graphql`
  query TodoListQuery {
    todoList {
      ...Todo
    }
  }
`;

type Props = {
  preloadedQuery: PreloadedQuery<TodoListQuery>;
};

const TodoList: React.FC<Props> = ({ preloadedQuery }) => {
  const { todoList } = usePreloadedQuery<TodoListQuery>(query, preloadedQuery);

  return (
    <ul>
      {todoList?.map((todo) => todo && <Todo key={hash(todo)} todo={todo} />)}
    </ul>
  );
};

const preloadedQuery = loadQuery<TodoListQuery>(environment, query, {});

const TodoListWrapper = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={"Loading..."}>
        <TodoList preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};

export default TodoListWrapper;
