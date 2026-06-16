import { FadeLoader } from "react-spinners";
const commonLoading = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <FadeLoader color="#24A19E" loading={true} />
    </div>
  );
};

export default commonLoading;
