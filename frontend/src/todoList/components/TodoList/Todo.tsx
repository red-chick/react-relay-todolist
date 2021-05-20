import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";

import type { Todo$key } from "../../../__generated__/Todo.graphql";

const todoFragment = graphql`
  fragment Todo on Todo {
    id
    title
    complete
  }
`;

type Props = {
  todo: Todo$key;
};

const Todo: React.FC<Props> = ({ todo }) => {
  const { id, title, complete } = useFragment(todoFragment, todo);

  return <li>{title}</li>;
};

export default Todo;
