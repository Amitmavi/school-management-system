// feesMasterFunction.jsx
import { Timestamp, collection, getDocs, getFirestore, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export const fetchClasses = async (setClasses) => {
  const db = getFirestore();
  try {
    const classesSnapshot = await getDocs(collection(db, 'classes'));
    const classesData = classesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setClasses(classesData);
  } catch (error) {
    console.error('Error getting classes:', error);
  }
};

export const fetchFeesGroups = async (setFeesGroups) => {
  try {
    const db = getFirestore();
    const feesGroupCollection = collection(db, "feesGroup");
    const feesGroupSnapshot = await getDocs(feesGroupCollection);
    const feesGroupList = feesGroupSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFeesGroups(feesGroupList);
  } catch (error) {
    console.error("Error fetching fees group:", error);
  }
};

export const fetchFeesTypes = async (setFeesTypes) => {
  try {
    const db = getFirestore();
    const feesTypesCollection = collection(db, "feesTypes");
    const feesTypesSnapshot = await getDocs(feesTypesCollection);
    const feesTypesList = feesTypesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFeesTypes(feesTypesList);
  } catch (error) {
    console.error("Error fetching fees types:", error);
  }
};

export const handleChange = (e, setFeesData, feesData) => {
  const { name, value } = e.target;
  setFeesData(prevState => ({
    ...prevState,
    [name]: value,
  }));
};

export const handleSubmit = async (selectedClass, feesData) => {
  try {
    if (!selectedClass || !feesData.feesGroup || !feesData.feesType) {
      toast.error("Please Select All the Fields.");
      throw new Error("Please select class, fees group, and fees type.");
    }

    const db = getFirestore();

    const feesMasterCollectionRef = collection(db, `classes/${selectedClass}/fees`);

    // Create a document with the selected fees group name
    const feesGroupDocRef = doc(feesMasterCollectionRef, feesData.feesGroup);

    // Create a collection under the fees group document named 'feesMaster'
    const feesMasterCollection = collection(feesGroupDocRef, 'feesMaster');

    // Create a document with the selected fees type name
    const feesTypeDocRef = doc(feesMasterCollection, feesData.feesType);

    // Convert dueDate to a Timestamp object
    const dueDateTimestamp = Timestamp.fromDate(new Date(feesData.dueDate));

    // Set data for the fees type document
    await setDoc(feesTypeDocRef, {
      amount: feesData.amount,
      dueDate: dueDateTimestamp,
      status: false,
      percentage: feesData.percentage,
      fixedAmount: feesData.fixedAmount
    });

    console.log("Data saved successfully!");
    toast.success("Fees Master created Successfully!");
  } catch (error) {
    console.error("Error saving data:", error.message);
  }
};
