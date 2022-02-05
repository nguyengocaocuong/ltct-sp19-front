import React, { useState, useEffect } from 'react'
import Badge from '../components/badge/Badge'
import CodeModal from '../components/code-modal/CodeModal'
import Table from '../components/table/Table'
import { deleteData, getData } from '../utils/feathData'
const promotionTableHead = [
    "",
    "Name",
    "Description",
    "DiscountValue",
    "ApplyProductId",
    "IsActived"
]
const renderHead = (item, index) => <th key={index}>{item}</th>

export const Promotion = () => {
    let listSelected = []
    const [isDisplay, setDisplay] = useState(false)
    const [promotionListBody, setPromotionListBody] = useState([])

    const handleChange = (id) => {
        let firstLen = listSelected.length
        for (let i = 0; i < listSelected.length; i++)
            if (listSelected[i] === id)
                listSelected.splice(i, 1)
        if (listSelected.length === firstLen)
            listSelected.push(id)
        setDisplay(listSelected.length === 0 ? false : true)
    }
    const getPromotionList = async () => {
        try {
            const promotions = await getData('sale/promotion/admin')
            setPromotionListBody(promotions.data);
        } catch (err) {
            console.log(err);
        }
    }
    const deletePromotion = () => {
        deleteData('sale/promotion/admin/destroy', { promotionIds: listSelected })
    }

    useEffect(() => {
        getPromotionList()
    }, []);
    const renderBody = (item, index) => (
        <tr key={index}>
            <td><input type="checkbox" onChange={(e) => handleChange(item.id)} /></td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.discount.discountType === 1 ? item.discount.discountValue + '%' : new Intl.NumberFormat('en-IN').format(item.discount.discountValue) + "đ"}</td>
            <td>{item.applyProduct.applyProductId.join(',')}</td>
            <td>{item.isActived ? <Badge type='success' content='Actived' /> : <Badge type='warning' content='Non Active' />}</td>
        </tr>
    )
    return (
        <div>
            <div className='top-header'>
                <h2 className="page-header">Promotion</h2>
                {
                    isDisplay ? (
                        <div className='action'>
                            <button onClick={deletePromotion}>Delete</button>
                        </div>
                    ) : ''
                }
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                promotionListBody.length > 0 ? <Table
                                    limit='10'
                                    headData={promotionTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={promotionListBody}
                                    renderBody={(item, index) => renderBody(item, index)}
                                /> : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CodeModal />
            </div>
        </div>
    )
}
