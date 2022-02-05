import React, { useState, useEffect } from 'react'
import Badge from '../components/badge/Badge'
import CodeModal from '../components/code-modal/CodeModal'
import Table from '../components/table/Table'
import { deleteData, getData } from '../utils/feathData'

const codeTableHead = [
    "",
    "Name",
    "Description",
    "Count",
    "Discount",
    "SubConditions",
    "Condition",
    "Code",
    "IsActived"
]
const renderHead = (item, index) => <th key={index}>{item}</th>


export const Code = () => {
    const [isDisplay, setDisplay] = useState(false)
    const [codeListBody, setCodeListBody] = useState([])

    let listSelected = []

    const getCodeList = async () => {
        try {
            const codes = await getData('sale/code/admin')
            setCodeListBody(codes.data)
            console.log(codes.data);
        } catch (err) {
            console.log(err)
        }
    }

    const deleteCode = () => {
        deleteData('sale/code/admin/delete', { codeIds: listSelected })
    }

    useEffect( () => {
        getCodeList()
    }, [])


    const handleChange = (id) => {
        let firstLen = listSelected.length
        for (let i = 0; i < listSelected.length; i++)
            if (listSelected[i] === id)
                listSelected.splice(i, 1)
        if (listSelected.length === firstLen)
            listSelected.push(id)
        setDisplay(listSelected.length === 0 ? false : true)
    }

    const renderBody = (item, index) => (
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
    return (
        <div>
            <div className='top-header'>
                <h2 className="page-header">Code</h2>
                {
                    isDisplay ? (
                        <div className='action'>
                            <button onClick={deleteCode}>Delete</button>
                        </div>
                    ) : ''
                }
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                codeListBody.length > 0 ? <Table
                                    limit='10'
                                    headData={codeTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={codeListBody}
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
