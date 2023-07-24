import { Vortex } from "react-loader-spinner";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperClass="vortex-wrapper"
        colors={[
          "#ffc13b",
          "#ffc13b",
          "#ffc13b",
          "#1e3d59",
          "#1e3d59",
          "#1e3d59",
        ]}
      />
    </div>
  );
};

export default Loader;
