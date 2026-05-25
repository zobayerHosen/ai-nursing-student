import { Modal } from "antd"

const CommonModal = ({ title, open, onOk, onCancel, okText, centered, cancelText, disabled, loading, danger, children }) => {
    return (
        <Modal title={title} open={open} onOk={onOk} onCancel={onCancel} okText={okText} centered={centered} cancelText={cancelText} okButtonProps={{ disabled, loading, danger }}>
            {children}
        </Modal>
    );
};
export default CommonModal;