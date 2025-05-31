const UniverseSection = () => {
  return (
    <div className="starry-bg relative h-screen">
      <div className="shooting-star" />
      <div
        className="shooting-star"
        style={{ left: "30%", animationDelay: "1.5s" }}
      />
      <h1 className="cosmic-text text-5xl font-bold text-center pt-40">
        Khám Phá Vũ Trụ
      </h1>
      <div className="planet-orbit mx-auto mt-10">
        <div className="planet" />
      </div>
    </div>
  );
};

export default UniverseSection;
