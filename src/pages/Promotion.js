import React, { useState, useEffect } from 'react'
import Badge from '../components/badge/Badge'
import CodeModal from '../components/code-modal/CodeModal'
import Table from '../components/table/Table'
import { getData } from '../utils/feathData'
const promotionTableHead = [
    "",
    "Name",
    "Description",
    "DiscountValue",
    "ApplyProductId",
    "IsActived"
]
// const promotionListBody = [
//     {
//         id: "61ecb93e753b99e106a1f479",
//         name: "promotion 2",
//         description: "description 1",
//         discountType: 1,
//         discountValue: 20,
//         applyProductType: 1,
//         applyProductId: [1, 2, 3, 4, 5],
//         isActived: false,
//     },
//     {
//         id: "61ecb93e753b99e106a1f4423",
//         name: "promotion 3",
//         description: "description 1",
//         discountType: 2,
//         discountValue: 50000,
//         applyProductType: 1,
//         applyProductId: [1, 2, 3, 4, 5],
//         isActived: true,
//     }
// ]
const renderHead = (item, index) => <th key={index}>{item}</th>

export const Promotion = () => {
    let listSelected = []
    const [isDisplay, setDisplay] = useState(false)
    const [promotionListBody, setPromotionListBody] = useState([])

    const handleChange = (id) => {
        let firstLen = listSelected.length
        listSelected = listSelected.filter(function (value) {
            return value !== id
        })
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

    useEffect(async () => {
        await getPromotionList()
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
                            <button>Delete</button>
                            <button>Active</button>
                            <button>Hidden</button>
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
