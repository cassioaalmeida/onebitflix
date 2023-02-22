import Link from "next/link";
import { Container, Form, Input } from "reactstrap";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import profileService from "@/services/profileService";
Modal.setAppElement("#__next");

const HeaderAuth = function () {
  const [initials, setInitials] = useState("");
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      const firstNameInitial = user.firstName.slice(0, 1);
      const lastNameInitial = user.lastName.slice(0, 1);
      setInitials(firstNameInitial + lastNameInitial);
    });
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  return <>
    <Modal
      isOpen={modalOpen}
      onRequestClose={handleCloseModal}
      shouldCloseOnEsc={true}
      className={styles.modal}
      overlayClassName={styles.overlayModal}
    >
      <Link href="/profile">
        <p className={styles.modalLink}>Meus Dados</p>
      </Link>
      <p className={styles.modalLink} onClick={handleLogout}>Sair</p>
    </Modal>
    <Container className={styles.nav}>
      <Link href="/home">
        <img src="/logoOnebitflix.svg" alt="logoOnebitflix" className={styles.imgLogoNav}/>
      </Link>
      <div className="d-flex align-items-center">
        <Form>
          <Input
            name="search"
            type="search"
            placeholder="Pesquisar"
            className={styles.input}
          />
        </Form>
        <img
          src="/homeAuth/iconSearch.svg"
          alt="lupaHeader"
          className={styles.searchImg}
        />
        <p className={styles.userProfile} onClick={handleOpenModal}>
          {initials}
        </p>
      </div>
    </Container>
  </>;
};

export default HeaderAuth;