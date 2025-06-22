import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

import styles from "./AppLayout.module.css";


export default function AppLayout({children}) {

    return (
        <div className={styles.wrapper}>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}