import { updateProfile } from "firebase/auth";

import Layout from '@components/Layout/Layout';

import styles from '@components/Complete/Complete.module.css';

export default function Complete() {
  
  // handleRegister
  // const register = async (name, email, password) => {
        // await updateProfile(auth.currentUser, { displayName: name })

        // displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"

        // Add an image

  return <Layout showActions={false}>
    <h1>Complete Account</h1>

    <form className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="displayName">Name</label>
        <input name="displayName" required />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" required />
      </div>

      <button>Complete</button>
    </form>
  </Layout>;
}