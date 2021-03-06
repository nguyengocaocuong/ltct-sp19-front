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
                      <p>Tên chương trình</p>
                      <input
                        type="text"
                        autoComplete="off"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        placeholder="Nhập tên"
                      ></input>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <p>Mô tả</p>
                      <input
                        type="text"
                        autoComplete="off"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        placeholder="Nhập mô tả"
                      ></input>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="form-group">
                      <p>Loại khuyến mãi</p>
                      <select
                        name="discountType"
                        id="discountType"
                        value={discountType}
                        onChange={handleChange}
                      >
                        <option value="1">Giảm giá theo phần trăm</option>
                        <option value="2">Giảm giá theo số tiền</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="form-group">
                      <p>Mức giảm</p>
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
                      <p>Áp dụng cho</p>
                      <select
                        name="applyProductType"
                        id="applyProductType"
                        value={applyProductType}
                        onChange={handleChange}
                      >
                        <option value="1">Category</option>
                        <option value="2">Sản phẩm</option>
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
                        Kích hoạt chương trình
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
                ? "Cập nhật chương trình khuyến mãi"
                : "Tạo chương trình khuyến mãi"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
