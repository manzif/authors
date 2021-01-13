import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Slider, Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none'
  }
}));

const ImageCrop = ({
  open,
  handleClose,
  imageSrc,
  onCrop,
  setEditorRef,
  scaleValue,
  onScaleChange
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <Modal open={open} onClose={handleClose}>
      <div style={modalStyle} className={classes.paper}>
        <AvatarEditor
          image={imageSrc}
          border={65}
          scale={scaleValue}
          ref={setEditorRef}
        />
        <Slider
          value={scaleValue}
          min={1}
          step={0.1}
          max={10}
          onChange={onScaleChange}
        />
        <Button variant="contained" color="primary" fullWidth onClick={onCrop}>
          Crop Image
        </Button>
      </div>
    </Modal>
  );
};

ImageCrop.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  imageSrc: PropTypes.object,
  onCrop: PropTypes.func,
  setEditorRef: PropTypes.func,
  scaleValue: PropTypes.number,
  onScaleChange: PropTypes.func
};

export default ImageCrop;
