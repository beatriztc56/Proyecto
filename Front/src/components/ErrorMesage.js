import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ErrorMesage() {
  const dispatch = useDispatch();
  const state = useSelector((s) => s);

  console.log(state);

  const message = useSelector((s) => s.error.message);

  console.log(message);

  return (
    <>
      {message ? (
        <div className="error">
          <p>{message}</p>
          <div>
            <button onClick={() => dispatch({ type: "CLEAR_ERROR" })}>
              Ok!
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
