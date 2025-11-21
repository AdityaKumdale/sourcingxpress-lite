import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

//   if (isRouteErrorResponse(error) && error.status === 302) {
//     // React Router already redirected the user,
//     // so no need to render anything.
//     return null;
//   }

  return (
    <div>
      <h2>Unexpected Application Error!</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}