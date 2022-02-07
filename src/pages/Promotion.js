import React, { useState, useEffect } from "react";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Badge from "../components/badge/Badge";
import Table from "../components/table/Table";
import { deleteData, getData } from "../utils/feathData";
const promotionTableHead = [
  "",
  "Name",
  "Discount Type",
  "Discount Value",
  "Active",
];
const renderHead = (item, index) => <th key={index}>{item}</th>;

export const Promotion = () => {
  const [listSelected, setListSelected] = useState([]);
  const [isDisplay, setDisplay] = useState(false);
  const [promotionListBody, setPromotionListBody] = useState([]);

  const handleChange = (id) => {
    let index = listSelected.indexOf(id);
    if (index >= 0) listSelected.splice(index, 1);
    else listSelected.push(id);
    setListSelected(listSelected);
    setDisplay(listSelected.length === 0 ? false : true);
  };
  const getPromotionList = async () => {
    try {
      const promotions = await getData("sale/promotion/admin");
      setPromotionListBody(promotions.data);
    } catch (err) {
      console.log(err);
    }
  };
  const deletePromotion = () => {
    deleteData("sale/promotion/admin/delete", {
      promotionIds: listSelected,
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Delete success Promotion");
        getPromotionList();
      } else toast.error("Can't delete Promotion");
    });
  };

  useEffect(() => {
    getPromotionList();
  }, []);
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>
        <input type="checkbox" onChange={(e) => handleChange(item._id)} />
      </td>
      <td>
        <Link to={`/promotion/${item._id}`}>{item.name}</Link>
      </td>

      <td>
        {item.discount.discountType === 2 && "cash discount"}
        {item.discount.discountType === 1 && "percent discount"}
      </td>
      <td>
        {item.discount.discountType === 1
          ? item.discount.discountValue + "%"
          : new Intl.NumberFormat("en-IN").format(item.discount.discountValue) +
            "đ"}
      </td>

      <td>
        {item.isActived ? (
          <Badge type="success" content="Actived" />
        ) : (
          <Badge type="warning" content="Non Active" />
        )}
      </td>
    </tr>
  );
  return (
    <div>
      <div className="top-header">
        <h2 className="page-header">Promotion</h2>
        {isDisplay ? (
          <div className="action">
            <button onClick={deletePromotion}>Delete</button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              {promotionListBody.length > 0 ? (
                <Table
                  limit="10"
                  headData={promotionTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={promotionListBody}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              ) : (
                <Bars />
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/promotion/create" className="btn-open__modal">
          New Promotion
        </Link>
      </div>
    </div>
  );
};
