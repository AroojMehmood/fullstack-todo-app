// Chhota reusable component — jab bhi data load ho raha ho, yeh spinner dikhata hai.

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="spinner"></div>
      <p>Loading todos...</p>
    </div>
  );
};

export default Loader;
