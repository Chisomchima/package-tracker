import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";


const Navbar = () => {
  return(
  <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.texts}>
          <div className={styles.text}>START TRACKING!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <Link href="/customer" passHref>
            <li className={styles.listItem}>Customer</li>
          </Link>
          <Link href="/driver" passHref>
            <li className={styles.listItem}>Driver</li>
          </Link>
          <Link href="/delivery-list" passHref>
            <li className={styles.listItem}>Admin</li>
          </Link>
        </ul>
      </div>

    </div>
  );
};

export default Navbar;