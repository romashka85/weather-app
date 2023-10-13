const Loader = ({ isLoading, children }) => {
  return <>{isLoading ? <h2 className="loading"></h2> : children}</>;
};
export default Loader;
