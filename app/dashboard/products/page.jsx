import styles from "../../ui/dashboard/products/products.module.css";
import Search from "../../ui/dashboard/search/search";
import Link from "next/link";
import Pagination from "../../ui/dashboard/pagination/pagination";
import Image from "next/image";


const ProductsPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for a product..." />
          <Link href="/dashboard/products/add">
            <button className={styles.addButton}>Add New Product</button>
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Created At</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> <div className={styles.product}>
                <img src="/noproduct.jpg"
                  alt=""
                  width={32}
                  height={32}
                  className={styles.productImage} />
                <span>phone</span>
              </div>
              </td>
              <td>desc</td>
              <td>₺999</td>
              <td>2021-01-01</td>
              <td>100</td>
              <td>
                <div className={styles.buttons}>
                  <Link href="/dashboard/products/test">
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

export default ProductsPage;