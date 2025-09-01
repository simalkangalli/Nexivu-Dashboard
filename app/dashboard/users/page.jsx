import styles from "../../ui/dashboard/users/users.module.css";
import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination/pagination";

const UsersPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for a user..." />
          <Link href="/dashboard/users/new">
            <button className={styles.addButton}>Add New Employee</button>
          </Link>
        </div>
        <table className={styles.table}>
                      <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
          <tbody>
            <tr>
              <td> <div className={styles.user}>
                <img src="/noavatar.png" 
                alt="" 
                width={32} 
                height={32} 
                className={styles.userImage}/>
                <span>simal simone</span>
              </div>
              </td>
              <td>simal.simone@example.com</td>
              <td>2021-01-01</td>
              <td>admin</td>
              <td>active</td>
                             <td>
                 <div className={styles.buttons}>
                   <Link href={`/dashboard/users/1`}>
                     <button className={styles.button}>View</button>
                   </Link>
                   <button className={styles.button}>Delete</button>
                 </div>
               </td>
            </tr>
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  )

};

export default UsersPage;