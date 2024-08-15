import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";
export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let navigate = useNavigate();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const [qty, SetQty] = useState(1);
  const [size, SetSize] = useState("");
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };
  const handleQty = (e) => {
    SetQty(e.target.value);
  };
  const handleOptions = (e) => {
    SetSize(e.target.value);
  };
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food);
    console.log(new Date());
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    // setBtnEnable(true)
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    SetSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "160px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select
                className="m-2 h-100 bg-success rounded"
                onChange={(e) => SetQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {" "}
                      {i + 1}{" "}
                    </option>
                  );
                })}
              </select>

              <select
                className="m-2 h-100 bg-success rounded"
                ref={priceRef}
                onChange={(e) => SetSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>

              <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            </div>
            <hr />
            <button
              className={"btn btn-success justify-center ms-2"}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
