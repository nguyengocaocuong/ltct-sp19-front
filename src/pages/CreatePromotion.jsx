/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../assets/css/promotion.css";
import { getData, patchData, postData } from "../utils/feathData";

export default function CreatePromotionPage() {
  const initialState = {
    name: "",
    description: "",
    discountType: "1",
    discountValue: null,
    applyProductType: "1",
    applyProductId: [],
    isActived: false,
  };

  const [promotion, setPromotion] = useState(initialState);
  const {
    name,
    description,
    discountType,
    discountValue,
    applyProductType,
    applyProductId,
    isActived,
  } = promotion;

  const { id } = useParams();
  const history = useHistory();
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`sale/promotion/admin/${id}`).then((res) => {
        const { data } = res;
        //console.log(data);
        setPromotion({
          name: data.name,
          description: data.description,
          discountType: String(data.discount.discountType),
          discountValue: data.discount.discountValue,
          applyProductType: String(data.applyProduct.applyProductType),
          applyProductId: "",
          isActived: data.isActived,
        });
      });
    } else {
      setOnEdit(false);
      setPromotion(initialState);
    }
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromotion({ ...promotion, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(promotion);
    if (onEdit) {
      const res = await patchData("sale/promotion/admin/edit", {
        id: id,
        name,
        description,
        discountType: Number(discountType),
        discountValue: Number(discountValue),
        applyProductType: Number(applyProductType),
        applyProductId: [2, 5],
        isActived,
      });

      console.log("res", res);
    } else {
      const res = await postData("sale/promotion/admin/create", {
        name,
        description,
        discountType: Number(discountType),
        discountValue: Number(discountValue),
        applyProductType: Number(applyProductType),
        applyProductId: [2, 5],
        isActived,
      });
      console.log(res);
    }

    history.push("/promotion");
  };
  return (
    <>
      <div className="top-header">
        <h2 className="page-header">
          {onEdit ? "Edit Promotion" : "Create Promotion"}
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-8">
            <div className="card">
              <div className="card__body">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <p>T??n ch????ng tr??nh</p>
                      <input
                        type="text"
                        autoComplete="off"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        placeholder="Nh???p t??n"
                      ></input>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <p>M?? t???</p>
                      <input
                        type="text"
                        autoComplete="off"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        placeholder="Nh???p m?? t???"
                      ></input>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="form-group">
                      <p>Lo???i khuy???n m??i</p>
                      <select
                        name="discountType"
                        id="discountType"
                        value={discountType}
                        onChange={handleChange}
                      >
                        <option value="1">Gi???m gi?? theo ph???n tr??m</option>
                        <option value="2">Gi???m gi?? theo s??? ti???n</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="form-group">
                      <p>M???c gi???m</p>
                      <input
                        type="number"
                        name="discountValue"
                        value={discountValue}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="form-group">
                      <p>??p d???ng cho</p>
                      <select
                        name="applyProductType"
                        id="applyProductType"
                        value={applyProductType}
                        onChange={handleChange}
                      >
                        <option value="1">Category</option>
                        <option value="2">S???n ph???m</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="form-group">
                      {applyProductType === "1" && (
                        <>
                          <p>Category</p>
                          <input
                            type="text"
                            name="applyProductId"
                            value={applyProductId}
                            onChange={handleChange}
                          ></input>
                        </>
                      )}

                      {applyProductType === "2" && (
                        <>
                          <p>Product</p>
                          <input
                            type="text"
                            name="applyProductId"
                            value={applyProductId}
                            onChange={handleChange}
                          ></input>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card__body">
                    <div className="form-group">
                      <p style={{ display: "inline-block" }}>
                        K??ch ho???t ch????ng tr??nh
                      </p>
                      <input
                        type="checkbox"
                        name="isActived"
                        value={isActived}
                        checked={isActived}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-12"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button type="submit" className="btn-submit">
              {onEdit
                ? "C???p nh???t ch????ng tr??nh khuy???n m??i"
                : "T???o ch????ng tr??nh khuy???n m??i"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
