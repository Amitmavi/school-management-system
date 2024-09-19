import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const NewAddBook = () => {
  const [title, setTitle] = useState('');
  const [bookNumber, setBookNumber] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publisher, setPublisher] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [rackNumber, setRackNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [postDate, setPostDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const db = getFirestore();
      const bookRef = doc(db, 'librarybook', title);
      await setDoc(bookRef, {
        title,
        bookNumber,
        isbn,
        publisher,
        author,
        subject,
        rackNumber,
        quantity,
        price,
        postDate,
        description
      });

      setTitle('');
      setBookNumber('');
      setIsbn('');
      setPublisher('');
      setAuthor('');
      setSubject('');
      setRackNumber('');
      setQuantity('');
      setPrice('');
      setPostDate(new Date().toISOString().split('T')[0]);
      setDescription('');

      toast.success('Book details saved successfully');
    } catch (error) {
      console.error('Error saving book details:', error);
      toast.error('Error saving book details');
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book Name:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Book Number:</label>
          <input type="text" value={bookNumber} onChange={(e) => setBookNumber(e.target.value)} required />
        </div>
        <div>
          <label>ISBN:</label>
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        </div>
        <div>
          <label>Publisher:</label>
          <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>
        <div>
          <label>Rack Number:</label>
          <input type="text" value={rackNumber} onChange={(e) => setRackNumber(e.target.value)} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div>
          <label>Price ($):</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label style={{ display: 'inline-block', width: '100px' }}>Post Date:</label>
          <input type="date" value={postDate} onChange={(e) => setPostDate(e.target.value)} required />
        </div> 
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NewAddBook;
