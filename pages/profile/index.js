import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import Layout from '@components/Layout/Layout';

import { useContext, useState } from "react";

import Context from "@components/Context";
import styles from '@components/Complete/Complete.module.css';

export default function Profile() {
  const { auth } = useContext(Context);
  console.log(auth);

  return <Layout>
    <p>Profile</p>
  </Layout>;
}