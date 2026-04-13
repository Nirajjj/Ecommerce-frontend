import { useRef } from "react";
import useAuthStore from "@/store/useAuthStore";
import styles from "./Profile.module.css";
import toast from "react-hot-toast";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const updateProfileImage = useAuthStore((state) => state.updateProfileImage);

  // const [preview, setPreview] = useState<string | null>(
  //   user?.avatar?.url || "https://res.cloudinary.com/dbozdghfi/image/upload/v1776072179/default_avatar_pmp8qj.jpg",
  // );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    // const formData = new FormData();
    // formData.append("image", file);
    // const imageUrl = URL.createObjectURL(file);
    // setPreview(file);

    // send file to backend
    updateProfileImage(file);
  };

  if (!user) return toast.loading("Loading profile...");

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageSection}>
          <img
            src={
              user?.avatar?.url ||
              "https://res.cloudinary.com/dbozdghfi/image/upload/v1776072179/default_avatar_pmp8qj.jpg"
            }
            alt="profile"
            className={styles.avatar}
            onClick={handleImageClick}
          />

          <button onClick={handleImageClick} className={styles.uploadBtn}>
            Change Photo
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />
        </div>

        <div className={styles.info}>
          <h2>{user.name}</h2>

          <div className={styles.field}>
            <span>Email</span>
            <p>{user.email}</p>
          </div>

          <div className={styles.field}>
            <span>Phone</span>
            <p>{user.phoneNumber || "Not provided"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
