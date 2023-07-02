import React, { useState } from "react";
import Layout from "../Layout";
import RedeemGifts from "./RedeemGifts";
import PointsStatistics from "./PointsStatistics";

const Redemption = () => {
  const [state, setState] = useState("Redeem gifts");
  return (
    <div>
      <Layout>
        {state === "Points statistics" && (
          <PointsStatistics state={state} setState={setState} />
        )}
        {state === "Redeem gifts" && (
          <RedeemGifts state={state} setState={setState} />
        )}
      </Layout>
    </div>
  );
};

export default Redemption;
