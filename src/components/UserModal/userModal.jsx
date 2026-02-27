import { createPortal } from "react-dom";
import styles from "./userModal.module.css";

export default function UserModal({ user, onClose }) {
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        <img src={user.image} alt={user.firstName} />

        <h2>
          {user.firstName} {user.lastName}
        </h2>

        <p>Возраст: {user.age}</p>
        <p>Рост: {user.height}</p>
        <p>Вес: {user.weight}</p>
        <p>Телефон: {user.phone}</p>
        <p>Email: {user.email}</p>

        <h3>Адрес:</h3>
        <p>Страна: {user.address?.country}</p>
        <p>Город: {user.address?.city}</p>
        <p>Адрес: {user.address?.address}</p>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}
