import React, { useState } from 'react';
import Table from '../components/table/Table'
import Badge from '../components/badge/Badge'

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
const codeListBody = [
    {
        id: "61ecb93e753b99e106a1f479",
        name: "code 2",
        description: "description 1",
        count: 12,
        discountType: 1,
        discountValue: 50,
        subConditions: 200000,
        contditionType: 1,
        contditionValue: 0,
        discountCode: 'discountCode35577',
        isActived: false,
    },
    {
        id: "61ecb93e753b99e106a1f479",
        name: "code 3",
        description: "description 1",
        count: 12,
        discountType: 2,
        discountValue: 50000,
        subConditions: 200000,
        contditionType: 1,
        contditionValue: 0,
        discountCode: 'discountCode35577',
        isActived: true,
    }
]
const promotionTableHead = [
    "",
    "Name",
    "DiscountValue",
    "ApplyProductId",
    "IsActived"
]
const promotionListBody = [
    {
        id: "61ecb93e753b99e106a1f479",
        name: "promotion 2",
        description: "description 1",
        discountType: 1,
        discountValue: 20,
        applyProductType: 1,
        applyProductId: [1, 2, 3, 4, 5],
        isActived: false,
    },
    {
        id: "61ecb93e753b99e106a1f4423",
        name: "promotion 3",
        description: "description 1",
        discountType: 2,
        discountValue: 50000,
        applyProductType: 1,
        isActived: true,
    }
]
const renderHead = (item, index) => <th key={index}>{item}</th>




export const Trash = () => {
    const [isCode, setIsCode] = useState(true)
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
            <td><input type="checkbox" onChange={(e) => handleChange(item.id, 1)} /></td>
            <td>{item.name}</td>
            <td>{item.count}</td>
            <td>{item.discountType === 1 ? item.discountValue + '%' : new Intl.NumberFormat().format(item.discountValue) + "đ"}</td>
            <td>{item.subConditions !== null ? 'Max' : ''} {new Intl.NumberFormat().format(item.subConditions) + "đ"}</td>
            <td>Min {new Intl.NumberFormat().format(item.contditionValue)} {item.contditionType === 1 ? "đ" : "SP"}</td>
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
                            <Table
                                limit='10'
                                headData={isCode ? codeTableHead : promotionTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={isCode ? codeListBody : promotionListBody}
                                renderBody={isCode ? renderCodeBody : renderPromotionBody}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button className="footer-action">Restore</button>
        </div>
    )
};
