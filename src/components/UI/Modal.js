import React from 'react';
import { Modal } from '@material-ui/core';
import PropTypes from 'prop-types';

const CustomModal = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal">{children}</div>
    </Modal>
  );
};

CustomModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node
};

export default CustomModal;
