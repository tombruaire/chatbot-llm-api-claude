import Image from "next/image";
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Image
          className={styles.logo}
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className={styles.ctas}>
          <h1 className="text-center">Chatbot</h1>
        </div>
      </div>
      <footer className={styles.footer}>
        <input type="text" className="form-control" placeholder="Que voulez-vous dire ?" />
        <button className="btn btn-primary">Envoyer</button>
      </footer>
    </div>
  );
}
