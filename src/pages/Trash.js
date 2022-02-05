import React, { useState, useEffect } from 'react';
import Table from '../components/table/Table'
import Badge from '../components/badge/Badge'
import { getData } from '../utils/feathData'

const codeTableHead = [
    "",
    "Name",
    "Count",
    "Discount",
    "SubConditions",
    "Condition",
    "Code",
    "IsActived"
]

const promotionTableHead = [
    "",
    "Name",
    "DiscountValue",
    "ApplyProductId",
    "IsActived"
]

const renderHead = (item, index) => <th key={index}>{item}</th>

export const Trash = () => {
    const [isCode, setIsCode] = useState(true)
    const [codeListBody, setCodeListBody] = useState([])
    const [promotionListBody, setPromotionListBody] = useState([])
    let listCodeSelected = []
    let listPromotionSelected = []

    const handleChange = (id, tag) => {
        if (tag === 1) {
            let firstLen = listCodeSelected.length
            listCodeSelected = listCodeSelected.filter(function (value) {
                return value !== id
            })
            if (listCodeSelected.length === firstLen)
                listCodeSelected.push(id)
        } else {
            let firstLen = listPromotionSelected.length
            listPromotionSelected = listPromotionSelected.filter(function (value) {
                return value !== id
            })
            if (listPromotionSelected.length === firstLen)
                listPromotionSelected.push(id)
        }
    }

    const renderCodeBody = (item, index) => (
        <tr key={index}>
            <td><input type="checkbox" onChange={(e) => handleChange(item._id)} /></td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.count}</td>
            <td>{item.discount.discountType === 1 ? item.discount.discountValue + '%' : new Intl.NumberFormat().format(item.discount.discountValue) + "đ"}</td>
            <td>{item.discount.subConditions !== null ? 'Max' : ''} {new Intl.NumberFormat().format(item.discount.subConditions) + "đ"}</td>
            <td>Min {new Intl.NumberFormat().format(item.condition.conditionValue)} {item.condition.conditionType === 1 ? "đ" : "SP"}</td>
            <td>{item.discountCode}</td>
            <td>{item.isActived ? <Badge type='success' content='Actived' /> : <Badge type='warning' content='Non Active' />}</td>
        </tr>
    )
    const renderPromotionBody = (item, index) => (
        <tr key={index}>
            <td><input type="checkbox" onChange={(e) => handleChange(item.id, 2)} /></td>
            <td>{item.name}</td>
            <td>{item.discountType === 1 ? item.discountValue + '%' : new Intl.NumberFormat().format(item.discountValue) + "đ"}</td>
            <td>{item.applyProductId}</td>
            <td>{item.isActived ? <Badge type='success' content='Actived' /> : <Badge type='warning' content='Non Active' />}</td>
        </tr>
    )

    const getDataTrtash = async () => {
        try {
            const resCode = await getData('sale/code/admin/trash')
            setCodeListBody(resCode.data)
        }
        catch (error) {
            console.log(error);
        }
        // try {
        //     const resPromotion = await getData('sale/promotion/admin/trash')
        //     setPromotionListBody(resPromotion.data)
        // }
        // catch (error) {
        //     console.log(error);
        // }
    }
    useEffect(() => {
        getDataTrtash()
    }, []);

    return (
        <div>
            <div className="top-header">
                <h2 className="page-header">Trash</h2>
                <div className="action">
                    <div className="input-group">
                        <input type="checkbox" checked={isCode} onChange={() => { setIsCode(true) }} />Code
                    </div>
                    <div className="input-group">
                        <input type="checkbox" checked={!isCode} onChange={() => { setIsCode(false) }} />Promotion
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                codeListBody.length > 0 ? <Table
                                    limit='10'
                                    headData={isCode ? codeTableHead : promotionTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={isCode ? codeListBody : promotionListBody}
                                    renderBody={isCode ? renderCodeBody : renderPromotionBody}
                                /> : ''
                            }

                        </div>
                    </div>
                </div>
            </div>
            <button className="footer-action">Restore</button>
        </div>
    )
};
