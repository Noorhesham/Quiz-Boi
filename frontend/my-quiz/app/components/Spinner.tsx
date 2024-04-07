import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return <FaSpinner className={` backdrop-blur-md z-50 text-red-400 animate-spin  left-[50%] top-[50%]  fixed  text-center text-5xl`} />;
};

export default Spinner;
