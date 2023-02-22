import Footer from "@/components/common/footer";
import ToastComponent from "@/components/common/toast";
import authService from "@/services/authService";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import HeaderGeneric from "../components/common/headerGeneric";
import styles from "../styles/registerLogin.module.scss";

const Login = function () {
  const router = useRouter();
  const [toastColor, setToastColor] = useState('');
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const registerSuccess = router.query.registred;

  
  useEffect(() => {
    if (localStorage.getItem("onebitflix-token")) {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    if (registerSuccess) {
      setToastColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Cadastro feito com sucesso!");
    }
  }, [registerSuccess]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const params = { email, password };

    const { status } = await authService.login(params);

    if (status === 200) {
      router.push("/home");
    } else {
      setToastColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Email ou senha incorretos!");
    }
  }
  return (
    <>
      <Head>
        <title>Onebitflix - Login</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <ToastComponent color={toastColor} isOpen={toastIsOpen} message={toastMessage}/>
        <HeaderGeneric logoUrl="/" btnUrl="/register" btnContent="Quero fazer parte" />
        <Container className="py-5">
          <p className={styles.formTitle}>Bem-vindo(a) ao OneBitFlix!</p>
          <Form className={styles.form} onSubmit={handleLogin}>
            <p className="text-center">
              <strong>Bem-vindo(a) ao OneBitFlix!</strong>
            </p>
            <FormGroup>
              <Label for="email" className={styles.label}>
                E-MAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Qual o seu email?"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                SENHA
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Qual a sua senha?"
                required
                className={styles.input}
              />
            </FormGroup>
            <Button type="submit" outline className={styles.formBtn}>
              ENTRAR
            </Button>
          </Form>
        </Container>
	      <Footer />
      </main>
    </>
  );
};

export default Login;