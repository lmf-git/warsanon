import { updateProfile } from "firebase/auth";

import Layout from '@components/Layout/Layout';

import styles from '@components/Home/Home.module.css';

export default function Complete() {
  
  
  // handleRegister
  // const register = async (name, email, password) => {
        // await updateProfile(auth.currentUser, { displayName: name })

        // displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"

        // Add an image


  return <Layout>
    <h1>Complete Account Ya Cunt</h1>

    <form>
      <input name="displayName" />
      <input name="email" type="email" />
      <button>Complete</button>
    </form>
  </Layout>;
}