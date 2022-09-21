import { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import Layout from '@components/Layout/Layout';

import styles from '@components/Profile/Complete/Complete.module.css';

export default function Complete() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  const [emailError, setEmailError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);

  const upload = (uid, file) => uploadBytes(ref(getStorage(), `/avatars/${uid}`), file);

  const onAvatarChange = async ev => {
    const file = ev.target?.files?.[0];
    if (file) {
      const uploadedImage = await upload(getAuth().currentUser.uid, file);
      const downloadURL = await getDownloadURL(uploadedImage.ref);
      setPhotoURL(downloadURL);
    }
  }

  const onSubmit = async ev => {
    ev.preventDefault();

    const user = getAuth().currentUser;
    const data = new FormData(ev.target);

    const displayName = data.get('displayName');

    try {
      // TODO: Save the image after selecting it, not on form submit (prevents delay).
      // Save the image.

      // Set the username, avatar, and email.
      await updateProfile(user, { displayName, photoURL });
      await updateEmail(user, data.get('email'));

      // Allow onwards past the complete profile guards.
      router.push('/worlds');

    } catch(e) {
      // TODO: Add frontend validation UI for this
      // FirebaseError: Firebase: Error (auth/email-already-in-use

      console.log(e.reason);
      console.log(e.message);
      console.log(e.code);

      console.log('Error completing profile');
      console.error(e);
    }
    
    return false;
  };

  return <Layout showActions={false}>

    {/* Show a preview of the uploaded image. */}
    { photoURL ? <img src={photoURL} /> : null }

    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.title}>Complete Account</h1>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">Image</label>
        <input 
          onChange={onAvatarChange}
          className={styles.input} name="image" type="file" />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="displayName">Name</label>
        <input 
          placeholder="Display name"
          className={styles.input} name="displayName" required />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">Email</label>
        <input 
          placeholder="Recovery email address"
          className={styles.input} name="email" type="email" required />
      </div>

      <button className={styles.submit}>Complete</button>
    </form>
  </Layout>;
}