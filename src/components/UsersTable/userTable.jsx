import { useState, memo } from "react";
import ResizableHeader from "./ResizableHeader";
import styles from "./usersTable.module.css";

export default memo(function UsersTable({ users, sort, onSort, onRowClick }) {
  const [widths, setWidths] = useState({
    lastName: 150,
    firstName: 150,
    gender: 80,
    age: 80,
    email: 200,
    phone: 160,
    country: 150,
    city: 150,
  });

  function getIcon(field) {
    if (sort.field !== field) return "⬍";
    if (sort.order === "asc") return "▲";
    return "▼";
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <ResizableHeader
            width={widths.lastName}
            onResize={(w) => setWidths((prev) => ({ ...prev, lastName: w }))}
          >
            <span onClick={() => onSort("lastName")} className={styles.icon}>
              Фамилия {getIcon("lastName")}
            </span>
          </ResizableHeader>

          <ResizableHeader
            width={widths.firstName}
            onResize={(w) => setWidths((prev) => ({ ...prev, firstName: w }))}
          >
            <span onClick={() => onSort("firstName")} className={styles.icon}>
              Имя {getIcon("firstName")}
            </span>
          </ResizableHeader>

          <ResizableHeader
            width={widths.gender}
            onResize={(w) => setWidths((prev) => ({ ...prev, gender: w }))}
          >
            <span onClick={() => onSort("gender")} className={styles.icon}>
              Пол {getIcon("gender")}
            </span>
          </ResizableHeader>

          <ResizableHeader
            width={widths.age}
            onResize={(w) => setWidths((prev) => ({ ...prev, age: w }))}
          >
            <span onClick={() => onSort("age")} className={styles.icon}>
              Возраст {getIcon("age")}{" "}
            </span>
          </ResizableHeader>

          <ResizableHeader
            width={widths.email}
            onResize={(w) => setWidths((prev) => ({ ...prev, email: w }))}
          >
            Email
          </ResizableHeader>

          <ResizableHeader
            width={widths.phone}
            onResize={(w) => setWidths((prev) => ({ ...prev, phone: w }))}
          >
            <span onClick={() => onSort("phone")} className={styles.icon}>
              Телефон {getIcon("phone")}
            </span>
          </ResizableHeader>

          <ResizableHeader
            width={widths.country}
            onResize={(w) => setWidths((prev) => ({ ...prev, country: w }))}
          >
            Страна
          </ResizableHeader>

          <ResizableHeader
            width={widths.city}
            onResize={(w) => setWidths((prev) => ({ ...prev, city: w }))}
          >
            Город
          </ResizableHeader>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id} onClick={() => onRowClick(user)}>
            <td style={{ width: widths.lastName }}>{user.lastName}</td>
            <td style={{ width: widths.firstName }}>{user.firstName}</td>
            <td style={{ width: widths.gender }}>{user.gender}</td>
            <td style={{ width: widths.age }}>{user.age}</td>
            <td style={{ width: widths.email }}>{user.email}</td>
            <td style={{ width: widths.phone }}>{user.phone}</td>
            <td style={{ width: widths.country }}>{user.address?.country}</td>
            <td style={{ width: widths.city }}>{user.address?.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
