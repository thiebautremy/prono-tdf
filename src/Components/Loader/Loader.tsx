import { Vortex } from "react-loader-spinner";

const Loader = () => {
  return (
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
  );
};

export default Loader;
