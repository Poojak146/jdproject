import { useEffect, useState } from "react";

const EmiOptionsCreditCards = ({ emiBankCards, handleCardSelection }) => {
  const [nameSelected, setNameSelected] = useState("");
  useEffect(() => {
    const [firstCard = {}] = emiBankCards || [];
    const { emiPlans = {}, name } = firstCard || {};
    handleCardSelection({ emiPlans, bankName: name });
    setNameSelected(name);
  }, [emiBankCards]);

  return (
    <div className="emi_option_left">
      <div className="bankul font14 color111">
        {emiBankCards.map(({ name, imgUrl, emiPlans }) => (
          <div
            className={`bankli dtbl ${name === nameSelected ? "active" : ""}`}
            key={name}
            onClick={() => {
              handleCardSelection({ emiPlans, bankName: name });
              setNameSelected(name);
            }}
          >
            <div className="imgbx dcell">
              {" "}
              <img src={imgUrl} />{" "}
            </div>
            <div className="bankname dcell ">{name} </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmiOptionsCreditCards;
