'use client'
import { useContext, useState } from "react";
import styles from "./page.module.scss";
import { context } from './context/ContextAPI';
export default function Home() {
  const { data, loading, error, postData } = useContext(context);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    surname: '',
    user_image: ''
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
      <div className={styles.page}>
      <main className={styles.main}>
        {data && data.map((user, index) => {
          return (
            <div key={index} className={styles.userCard}>
              <h2>{user.name} { user.surname}</h2>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </div>
          );
        })}
        <div className={styles.form}>
          <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          <input type="text" placeholder="Phone" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
          <input type="text" placeholder="Surname" value={newUser.surname} onChange={(e) => setNewUser({ ...newUser, surname: e.target.value })} />
          <input type="text" placeholder="User Image URL" value={newUser.user_image} onChange={(e) => setNewUser({ ...newUser, user_image: e.target.value })} />
          <button
  onClick={async () => {
    await postData(newUser);
    setNewUser({
      name: '',
      email: '',
      password: '',
      phone: '',
      surname: '',
      user_image: ''
    });
  }}
>
  Create User
</button>
        </div>
      </main>
    </div>
    
  );
}
