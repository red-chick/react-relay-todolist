import {
  loadQuery,
  PreloadedQuery,
  RelayEnvironmentProvider,
  usePreloadedQuery,
} from "react-relay";
import environment from "./environment";

import graphql from "babel-plugin-relay/macro";
import { AppQuery } from "./__generated__/AppQuery.graphql";
import { Suspense } from "react";

const query = graphql`
  query AppQuery {
    todoList {
      id
      title
      complete
    }
  }
`;

type Props = {
  preloadedQuery: PreloadedQuery<AppQuery, {}>;
};

const App: React.FC<Props> = ({ preloadedQuery }) => {
  const { todoList } = usePreloadedQuery<AppQuery>(query, preloadedQuery);

  return (
    <main>
      {todoList?.map((todo) => todo && <li key={todo.id}>{todo.title}</li>)}
    </main>
  );
};

const preloadedQuery = loadQuery<AppQuery>(environment, query, {});

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={"Loading..."}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
