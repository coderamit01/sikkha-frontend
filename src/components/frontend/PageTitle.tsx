import titleBg from "@/assets/title_bg.webp";

const PageTitle = ({ title, subText }: { title: string; subText: string }) => {
  return (
    <div
      className="text-white bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${titleBg.src})` }}
    >
      <div className="max-w-310 mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          {title ? title : ""}
        </h1>
        <p className="text-violet-100 text-lg">{subText ? subText : ""}</p>
      </div>
    </div>
  );
};

export default PageTitle;
