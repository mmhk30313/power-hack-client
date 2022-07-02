import React from 'react';
import { Modal } from 'antd';
const AntModal = ({visibleModal, handleCancel, modal_title, width, children}: any) => {
    console.log({modal_title, visibleModal});
    
    return (
        <Modal
            title={modal_title || false}
            visible={visibleModal}
            onCancel={() => handleCancel(true)}
            // onOk={() => setVisibleModal(false)}
            footer={null}
            width={width || 740}
        >
            {
                children
            }
        </Modal>
    );
};

export default AntModal;