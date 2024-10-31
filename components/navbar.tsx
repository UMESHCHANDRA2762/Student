import Link from 'next/link';
import styles from './Navbar.module.css'; // Adjust the path as necessary

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">My CRUD App</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/students/new">Add Student</Link>
        </li>
        <li>
          <Link href="/students">Manage Students</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
