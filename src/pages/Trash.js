import React, { useState, useEffect } from 'react';
import Table from '../components/table/Table'
import Badge from '../components/badge/Badge'
import { getData, patchData, deleteData } from '../utils/feathData'

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
    const [listCodeSelected, setListCodeSelected] = useState([])
    const [listPromotionSelected, setListPromotionSelected] = useState([])

    const handleChange = (id, tag) => {
        if (tag === 1) {
            let index = listCodeSelected.indexOf(id)
            if (index >= 0)
                listCodeSelected.splice(index, 1)
            else
                listCodeSelected.push(id)
            setListCodeSelected(listCodeSelected)
        } else {
            let index = listPromotionSelected.indexOf(id)
            if (index >= 0)
                listPromotionSelected.splice(index, 1)
            else
                listPromotionSelected.push(id)
            setListPromotionSelected(listPromotionSelected)
        }
    }

    const renderCodeBody = (item, index) => (
        <tr key={index}>
            <td><input type="checkbox" onChange={(e) => handleChange(item._id, 1)} /></td>
            <td>{item.name}</td>
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
            <td><input type="checkbox" onChange={(e) => handleChange(item._id, 2)} /></td>
            <td>{item.name}</td>
            <td>{item.discount.discountType === 1 ? item.discount.discountValue + '%' : new Intl.NumberFormat('en-IN').format(item.discount.discountValue) + "đ"}</td>
            <td>{item.applyProduct.applyProductId.join(',')}</td>
            <td>{item.isActived ? <Badge type='success' content='Actived' /> : <Badge type='warning' content='Non Active' />}</td>
        </tr>
    )

    const getDataTrtash = async () => {
        try {
            const resCode = await getData('sale/code/admin/trash')
            setCodeListBody(resCode.data)
            const resPromotion = await getData('sale/promotion/admin/trash')
            setPromotionListBody(resPromotion.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    const destroy = () => {
        if (isCode)
            deleteData('sale/code/admin/destroy', { codeIds: listCodeSelected })
        else
            deleteData('sale/promotion/admin/destroy', { promotionIds: listPromotionSelected })

    }
    const restore = () => {
        if (isCode)
            patchData('sale/code/admin/restore', { codeIds: listCodeSelected })
        else
            patchData('sale/promotion/admin/restore', { promotionIds: listPromotionSelected })
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
                                codeListBody.length > 0 && isCode ? <Table
                                    limit='10'
                                    headData={codeTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={codeListBody}
                                    renderBody={renderCodeBody}
                                /> : ''
                            }
                            {
                                promotionListBody.length > 0 && !isCode ? <Table
                                    limit='10'
                                    headData={promotionTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={promotionListBody}
                                    renderBody={renderPromotionBody}
                                /> : ''
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className='footer-action'>
                <button className="footer-action__btn" onClick={restore}>Restore</button>
                <button className="footer-action__btn" onClick={destroy}>Delete</button></div>
        </div>
    )
};
