import "./not-found.scss";

export const BoardNotFound = () => {
  return (
    <div className="not-found board-not-found">
      <h1 className="text-theme">Board Not Found</h1>
    </div>
  );
};

export const PathNotFound = () => {
  return (
    <div className="not-found page-not-found">
      <h1 className="text-theme">
        404 Not Found. You might type invalid address.
      </h1>
    </div>
  );
};
