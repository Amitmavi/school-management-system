import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StudentAdmissionLink() {

  const [open, setOpen] = React.useState(false);
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateAdmissionLink = () => {
    // Assuming your link format is something like "http://localhost:3000/online-admission/<admissionNumber>"
    return `http://localhost:3000/online-admission/?admissionNumber=${admissionNumber}`;
  };
  

  const handleWhatsAppClick = () => {
    const link = generateAdmissionLink();
    const encodedLink = encodeURIComponent(link);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedLink}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const handleEmailClick = () => {
    const link = generateAdmissionLink();
    const emailSubject = "Admission Link";
    const emailBody = `Here is the admission link: ${link}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyLinkClick = () => {
    const link = generateAdmissionLink();
    navigator.clipboard.writeText(link)
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => {
          setLinkCopied(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error copying link to clipboard:', error);
        toast.error('Error copying link to clipboard. Please try again.');
      });
  };
  
  const getLatestAdmissionNumber = async () => {
    const db = getFirestore();
    const admissionCollection = collection(db, 'students');
    try {
      const querySnapshot = await getDocs(
        query(admissionCollection, orderBy('admissionNumber', 'desc'), limit(1))
      );
      if (!querySnapshot.empty) {
        const latestAdmission = querySnapshot.docs[0].data();
        const admissionNumber = latestAdmission.admissionNumber;
        console.log('Latest admission number:', admissionNumber);
        return admissionNumber;
      } else {
        // If no admission records found, set admission number to 1
        console.log('No admission records found. Setting admission number to 1.');
        return 1;
      }
    } catch (error) {
      console.error('Error fetching latest admission number:', error);
      throw error; // Throw error if unable to fetch the latest admission number
    }
  };

  useEffect(() => {
    // Fetch the latest admission number when the component mounts
    getLatestAdmissionNumber().then((latestNumber) => {
      // Increment the latest admission number by 1 to generate the new admission number
      const newAdmissionNumber = latestNumber ? latestNumber + 1 : 1;
      setAdmissionNumber(newAdmissionNumber);
    }).catch((error) => {
      console.error('Error fetching latest admission number:', error);
      toast.error('Error fetching latest admission number. Please try again later.');
    });
  }, []);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" href="#outlined-buttons" onClick={handleClickOpen}>
          Link
        </Button>
      </Stack>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Share the Link 🔗 for Admission"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Generated LINK: {generateAdmissionLink()} 
            <IconButton onClick={handleCopyLinkClick}><ContentCopyIcon/></IconButton>
            {linkCopied && <span>Link copied!</span>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleWhatsAppClick}> <WhatsAppIcon/> </IconButton>
          <IconButton onClick={handleEmailClick} > <EmailIcon/></IconButton>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
