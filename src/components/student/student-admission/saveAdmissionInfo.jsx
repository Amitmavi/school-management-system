import { getFirestore, doc, setDoc } from 'firebase/firestore';

const saveAdmissionInfo = async (uid, userData) => {
  try {
    const db = getFirestore();
    const admissionDoc = doc(db, 'students', uid);
    await setDoc(admissionDoc, userData);
    return true; // Return true if data is saved successfully
  } catch (error) {
    console.error('Error saving admission info:', error);
    return false; // Return false if there's an error
  }
};

export { saveAdmissionInfo };
