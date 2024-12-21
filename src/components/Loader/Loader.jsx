import { Puff } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <Puff
      height="80"
      width="80"
      color="rgb(79, 72, 72)"
      ariaLabel="puff-loading"
      wrapperClass={css.loader}
    />
  );
};

export default Loader;
