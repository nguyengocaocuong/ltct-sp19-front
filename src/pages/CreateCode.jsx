/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../assets/css/promotion.css";
import { getData, patchData, postData } from "../utils/feathData";
export default function CreateCodePage() {
  const initialState = {
    name: "",
    description: "",
    count: 9999,
    discountType: "1",
    discountValue: null,
    subConditions: null,
    conditionType: "1",
    conditionValue: null,
    discountCode: "",
    isActived: false,
  };
  const [code, setCode] = useState(initialState);
  const {
    name,
    description,
    count,
    discountType,
    discountValue,
    subConditions,
    conditionType,
    conditionValue,
    discountCode,
    isActived,
  } = code;

  const { id } = useParams();
  const history = useHistory();
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`sale/code/admin/${id}`).then((res) => {
        const { data } = res;
        //console.log(data);
        setCode({
          name: data.name,
          description: data.description,
          count: data.count,
          discountValue: data.discount.discountValue,
          subConditions: data.discount.subConditions,
          conditionValue: data.condition.conditionValue,
          discountCode: data.discountCode,
          isActived: data.isActived,
          discountType: String(data.discount.discountType),
          conditionType: String(data.condition.conditionType),
        });
      });
    } else {
      setOnEdit(false);
      setCode(initialState);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCode({ ...code, [name]: value });
  };

  //console.log("code", code);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({
    //   name,
    //   description,
    //   count: typeof count === "number" ? count : Number(count),
    //   discountType: Number(discountType),
    //   discountValue: Number(discountValue),
    //   subConditions: subConditions === null ? null : Number(subConditions),
    //   conditionType: Number(conditionType),
    //   conditionValue: Number(conditionValue),
    //   discountCode,
    //   isActived,
    // });

    if (onEdit) {
      const res = await patchData("sale/code/admin/edit", {
        id: id,
        name,
        description,
        count: typeof count === "number" ? count : Number(count),
        discountType: Number(discountType),
        discountValue: Number(discountValue),
        subConditions: subConditions === null ? null : Number(subConditions),
        conditionType: Number(conditionType),
        conditionValue: Number(conditionValue),
        discountCode,
        isActived,
      });

      console.log("res", res);
    } else {
      const res = await postData("sale/code/admin/create", {
        name,
        description,
        count: typeof count === "number" ? count : Number(count),
        discountType: Number(discountType),
        discountValue: Number(discountValue),
        subConditions: subConditions === null ? null : Number(subConditions),
        conditionType: Number(conditionType),
        conditionValue: Number(conditionValue),
        discountCode,
        isActived,
      });
      console.log(res);
    }

    history.push("/code");
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
                      <p>T??n khuy???n m??i</p>
                      <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        value={name}
                        placeholder="Nh???p t??n "
                        onChange={handleChange}
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
                        placeholder="M?? t???"
                        onChange={handleChange}
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
                    {discountType === "1" && (
                      <div className="row">
                        <div className="col-6">
                          <div className="form-group">
                            <p>M???c gi???m</p>
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
                            <p>Gi???m nhi???u nh???t</p>
                            <input
                              name="subConditions"
                              type="number"
                              value={subConditions}
                              onChange={handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                    )}
                    {discountType === "2" && (
                      <div className="form-group">
                        <p>M???c gi???m</p>
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
                      <p>??i???u ki???n ??p d???ng</p>
                      <select
                        name="conditionType"
                        id="conditionType"
                        value={conditionType}
                        onChange={handleChange}
                      >
                        <option value="1">T???ng gi?? tr??? ????n h??ng ??t nh???t</option>
                        <option value="2">S??? l?????ng s???n ph???m ??t nh???t</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="form-group">
                      <p>Th??ng s??? ??i???u ki???n</p>
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
                      <p style={{ display: "inline-block" }}>K??ch ho???t m??</p>
                      <input
                        type="checkbox"
                        name="isActived"
                        checked={isActived}
                        value={isActived}
                        onChange={handleChange}
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
                      <p>M?? khuy???n m??i</p>
                      <input
                        type="text"
                        autoComplete="off"
                        name="discountCode"
                        value={discountCode}
                        placeholder="Nh???p m?? khuy???n m??i"
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
                      <p>S??? l?????ng m??</p>
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
              {onEdit ? "C???p nh???t m?? khuy???n m??i" : "T???o m?? khuy???n m??i"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
