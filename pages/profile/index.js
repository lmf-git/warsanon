import { useContext, useState } from "react";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import Layout from '@components/Layout/Layout';

import Context from "@components/Context";
import styles from '@components/Profile/Complete/Complete.module.css';

export default function Profile() {
  const { auth } = useContext(Context);
  console.log(auth);

  return <Layout>
    <p>Profile</p>
    { auth?.uid }
    <br />
    { auth?.displayName }

    { auth?.photoURL ? <img width="5em" src={auth.photoURL} /> : null }
  </Layout>;
}