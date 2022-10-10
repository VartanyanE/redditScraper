import React from "react";
import Ticker from "react-ticker";

const MoveStuffAround = () => (
  <Ticker>
    {async () =>
      await (
        <>
          <h1>This is the Headline of element!</h1>
          <img src="www.my-image-source.com/" alt="" />
        </>
      )
    }
  </Ticker>
);

export default MoveStuffAround;
