import React from 'react';
import Modal from 'react-modal';
import './codeModal.css'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const CodeModal = (prop) => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const afterOpenModal = () => {
        subtitle.style.color = '#f00';
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal} className="btn-open__modal">New Discount</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="code-modal__header">
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Chọn loại khuyến mãi</h2>
                    <button onClick={closeModal}>X</button>
                </div>
                <div className="discount-type">Code</div>
                <div className="discount-type">Promotion</div>
            </Modal>
        </div>
    );
}

export default CodeModal