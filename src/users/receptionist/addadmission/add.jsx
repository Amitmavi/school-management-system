import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'; // Import Grid component
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { animated, useSpring } from '@react-spring/web';
import { collection, doc, setDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import * as React from 'react';
import { toast } from 'react-toastify';
import { db } from '../../../utils/firebaseConfig';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SpringModal() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [discription, setDiscription] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    // Construct the data object
    const formDataObject = {
      name,
      phone,
      email,
      address,
      discription,
    };

    try {
      // Store data in Firestore using setDoc
      const docRef = doc(collection(db, 'admissionEnquiry')); // Get a reference to a new document
      await setDoc(docRef, formDataObject); // Set the data in the document
      console.log("Enquiry submitted successfully!");
      toast.success("succesfull")
      setName("")
      setPhone("")
      setEmail("")
      setAddress("")
      setDiscription("")
      
      handleClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding enquiry: ", error);
      // Handle errors here
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>ADD</Button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="server-modal-title" variant="h6" component="h2">
              {/* Modal title */}
            </Typography>
            <Typography id="server-modal-description" sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <label>
                    Name <br />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ width: '100%' }}
                      required
                    />
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <label>
                    Phone <br />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ width: '100%' }}
                      required
                    />
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <label>
                    Email <br />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ width: '100%' }}
                      required
                    />
                  </label>
                </Grid>
                <Grid item xs={4}>
                  <label>
                    Address<br />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{ width: '100%' }}
                      required
                    />
                  </label>
                </Grid><Grid item xs={3}>
                  <label>
                    Description <br />
                    <input
                      type="text"
                      value={ discription}
                      onChange={(e) => setDiscription(e.target.value)}
                      style={{ width: '100%' }}
                      required
                    />
                  </label>
                </Grid>
              </Grid>
              {/* Submit button */}
              <Button onClick={handleSubmit}>Save</Button>
              {/* Close button */}
              <Button onClick={handleClose} style={{ marginTop: '10px' }}>
                Close
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
