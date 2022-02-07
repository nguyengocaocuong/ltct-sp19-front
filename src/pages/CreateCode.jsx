/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../assets/css/promotion.css";
import { getData, patchData, postData } from "../utils/feathData";
import { toast } from "react-toastify";
import { validateCode } from "../utils/validate";
export default function CreateCodePage() {
  const initialState = {
    name: "",
    description: "",
    count: 9999,
    discountType: "1",
    discountValue: null,
    conditionType: "1",
    conditionValue: null,
    discountCode: "",
  };

  const [subConditions, setSubConditions] = useState(-1);
  const [isActived, setIsActived] = useState(false);
  const [code, setCode] = useState(initialState);
  const {
    name,
    description,
    count,
    discountType,
    discountValue,
    conditionType,
    conditionValue,
    discountCode,
  } = code;

  const { id } = useParams();
  const history = useHistory();
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`sale/code/admin/${id}`).then((res) => {
        const { data } = res;
        console.log(data);
        setCode({
          name: data.name,
          description: data.description,
          count: data.count,
          discountValue: data.discount.discountValue,
          conditionValue: data.condition.conditionValue,
          discountCode: data.discountCode,
          discountType: String(data.discount.discountType),
          conditionType: String(data.condition.conditionType),
        });
        setIsActived(data.isActived);
        setSubConditions(data.discount.subConditions);
      });
    } else {
      setOnEdit(false);
      setCode(initialState);
    }
  }, [id]);

  useEffect(() => {
    if (discountType === "2") {
      setSubConditions(-1);
    }
  }, [discountType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCode({ ...code, [name]: value });
  };

  const handleChangeActive = () => {
    setIsActived(!isActived);
  };

  const handleChangeSubCondition = (e) => {
    setSubConditions(e.target.value);
  };
  //console.log("code", code);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = validateCode(code);
    if (status === 1) {
      if (onEdit) {
        console.log(code);
        const res = await patchData("sale/code/admin/edit", {
          id: id,
          name,
          description,
          count: typeof count === "number" ? count : Number(count),
          discountType: Number(discountType),
          discountValue: Number(discountValue),
          subConditions: Number(subConditions),
          conditionType: Number(conditionType),
          conditionValue: Number(conditionValue),
          discountCode,
          isActived,
        });

        if (res.success) {
          toast.success(res.success);
          history.push("/code");
        }

        if (res.error) {
          toast.error(res.error);
        }
      } else {
        const res = await postData("sale/code/admin/create", {
          name,
          description,
          count: typeof count === "number" ? count : Number(count),
          discountType: Number(discountType),
          discountValue: Number(discountValue),
          subConditions: Number(subConditions),
          conditionType: Number(conditionType),
          conditionValue: Number(conditionValue),
          discountCode,
          isActived,
        });

        if (res.success) {
          toast.success(res.success);
          history.push("/code");
        }

        if (res.error) {
          toast.error(res.error);
        }
      }
    } else {
      toast.error(status);
    }
  };

  return (
    <>
      <div className="top-header">
        <h2 className="page-header">{onEdit ? "Edit Code" : "Create Code"}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-8">
            <div className="card">
              <div className="card__body">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <p>Tên khuyến mãi</p>
                      <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        value={name}
                        placeholder="Nhập tên "
                        onChange={handleChange}
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
                        placeholder="Mô tả"
                        onChange={handleChange}
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
                    {discountType === "1" && (
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <p>Mức giảm</p>
                            <input
                              name="discountValue"
                              type="number"
                              value={discountValue}
                              onChange={handleChange}
                            ></input>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <p>Giảm nhiều nhất</p>
                            <input
                              name="subConditions"
                              type="number"
                              value={subConditions}
                              onChange={handleChangeSubCondition}
                            ></input>
                          </div>
                        </div>
                      </div>
                    )}
                    {discountType === "2" && (
                      <div className="form-group">
                        <p>Mức giảm</p>
                        <input
                          type="number"
                          name="discountValue"
                          value={discountValue}
                          onChange={handleChange}
                        ></input>
                      </div>
                    )}
                  </div>
                  <div className="col-5">
                    <div className="form-group">
                      <p>Điều kiện áp dụng</p>
                      <select
                        name="conditionType"
                        id="conditionType"
                        value={conditionType}
                        onChange={handleChange}
                      >
                        <option value="1">Tổng giá trị đơn hàng ít nhất</option>
                        <option value="2">Số lượng sản phẩm ít nhất</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="form-group">
                      <p>Thông số điều kiện</p>
                      <input
                        type="number"
                        name="conditionValue"
                        value={conditionValue}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="form-group">
                      <p style={{ display: "inline-block" }}>Kích hoạt mã</p>
                      <input
                        type="checkbox"
                        name="isActived"
                        checked={isActived}
                        onChange={handleChangeActive}
                      ></input>
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
                      <p>Mã khuyến mãi</p>
                      <input
                        type="text"
                        autoComplete="off"
                        name="discountCode"
                        value={discountCode}
                        placeholder="Nhập mã khuyến mãi"
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card__body">
                    <div className="form-group">
                      <p>Số lượng mã</p>
                      <input
                        type="number"
                        name="count"
                        value={count}
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
              {onEdit ? "Cập nhật mã khuyến mãi" : "Tạo mã khuyễn mãi"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
