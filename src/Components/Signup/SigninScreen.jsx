import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../Styles/Components/Auth/SigninScreen.css";
import { variables } from "../../Variables";
import Login from "./Login/Login";
import UserTypeSelectionScreen from "./Register/UserTypeSelectionScreen";
import { SignupFormContext } from "../../Contexts/SignupLoginFormContext";
import SignupScreen from "./Register/SignupScreen";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
  linkWithCredential,
  fetchSignInMethodsForEmail
} from "firebase/auth";
import { auth } from '../../firebase/config.js'
import { toast } from "react-toastify";

export default function SigninScreen(props) {
  const [currentScreen, setCurrentScreen] = useState("main");
  const { signupFormData } = useContext(SignupFormContext);

  const googleProvider = new GoogleAuthProvider();
  const fbAuthProvider = new FacebookAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function googleAuth() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        if (user.providerData) {
          navigate('/search')
          toast('Logado com sucesso!')
          props.setTrigger(false);
          props.menuClick()
        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  const facebookAuth = async () => {
    try {
      const fbAuth = await signInWithPopup(auth, fbAuthProvider);

      console.log(fbAuth)

      if (fbAuth.providerId === 'facebook.com' ) {
        navigate('/search')
        toast('Logado com sucesso!')
        props.setTrigger(false);
        props.menuClick()
      }

      return fbAuth;
    } catch (error) {
      console.log(error);
    }
  }

  /* O método linkGoogleAccount é usado apenas quando o usuário já está autenticado
  no aplicativo com um método (como email/senha) e quer
  vincular outra forma de login (neste caso, o Google) à mesma conta. 
  */
  const linkGoogleAccount = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
  
      if (auth.currentUser) {
        await linkWithCredential(auth.currentUser, credential);
        console.log("Conta Google vinculada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao vincular conta Google:", error.message);
    }
  };
  
  /* 
    O método linkFacebookAccount é usado apenas quando o usuário já está autenticado
    no aplicativo com um método (como email/senha) e quer vincular outra forma
    de login (neste caso, o Facebook) à mesma conta.
  */
  const linkFacebookAccount = async () => {
    try {
      const facebookProvider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, facebookProvider);
      const credential = FacebookAuthProvider.credentialFromResult(result);
  
      if (auth.currentUser) {
        await linkWithCredential(auth.currentUser, credential);
        console.log("Conta Facebook vinculada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao vincular conta Facebook:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        /* console.log("User is logged in:"); */
      } else {
        console.log("User is logged out");
      }
    });
  
    return () => unsubscribe();  // Limpar a assinatura quando o componente for desmontado
  }, []);

  //Para evitar duplicação de dados, você pode detectar contas existentes pelo e-mail antes de criar novas,
  const checkExistingAccount = async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        console.log("Métodos de login disponíveis para este email:", methods);
      } else {
        console.log("Nenhuma conta encontrada para este email.");
      }
    } catch (error) {
      console.error("Erro ao verificar conta:", error.message);
    }
  };

  function closeSignupScreen() {
    props.setTrigger(false);
    setCurrentScreen("main");
  }

  useEffect(() => {
    if (signupFormData.professionalsDto.type === "TATTOO") {
      setCurrentScreen("tattoo");
    } else if (signupFormData.professionalsDto.type === "PIERCER") {
      setCurrentScreen("piercer");
    } else if (signupFormData.role === "USER") {
      setCurrentScreen("user");
    }
  }, [signupFormData.role]);

  return props.trigger ? (
    <>
      {currentScreen === "main" && (
        <div className="signin-container">
          <div className="signin-popup">
            <button className="signin-close-button" onClick={closeSignupScreen}>
              <img src={variables.closeMenu}></img>
            </button>
            <div className="signin-screen-container">
              <div className="signin-banner">
                <img src={variables.loginBanner} alt="" />
              </div>
              <div className="signin-fields">
                <div className="signin-top">
                  <p>Criar uma nova conta</p>
                  <span>
                    Já tem uma conta?
                    <a onClick={() => setCurrentScreen("login")}> Entrar</a>
                  </span>
                  {/*Adicionar tela de login */}
                </div>
                <div className="signin-buttons">
                  <button onClick={googleAuth}>
                    <div className="account-img-button">
                      <img src="Assets/icons/social-networks/google.png" />
                    </div>
                    Continuar com o Google
                  </button>
                  <button onClick={() => setCurrentScreen("email")}>
                    <div className="account-img-button">
                      <img src="Assets/icons/social-networks/email.png" />
                    </div>
                    Continuar com o e-mail
                  </button>
                  <div className="signin-breaker">
                    <p>ou</p>
                  </div>
                  <div className="other-signin-methods">
                    <button>
                      <div className="account-img-button other-signin-methods-buttons">
                        <img src="Assets/icons/social-networks/apple.png" />
                      </div>
                      Apple
                    </button>
                    <button onClick={facebookAuth}>
                      <div className="account-img-button other-signin-methods-buttons">
                        <img src="Assets/icons/social-networks/facebook.png" />
                      </div>
                      Facebook
                    </button>
                  </div>
                  <div className="listtta-terms">
                    <p>
                      Ao inscrever-se, você concorda com os{" "}
                      <a href="#">Termos de Serviço</a> do Listtta e aceita
                      receber nossos e-mails ocasionalmente. Leia nossa{" "}
                      <a href="#">Política de Privacidade</a> para saber como
                      usamos seus dados pessoais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentScreen === "login" && (
        <Login trigger={true} setTrigger={() => setCurrentScreen("main")} />
      )}
      {currentScreen === "email" && (
        <UserTypeSelectionScreen
          trigger={true}
          setTrigger={() => setCurrentScreen("main")}
        />
      )}
      {currentScreen === "tattoo" && (
        <SignupScreen
          trigger={true}
          setTrigger={() => setCurrentScreen("main")}
        />
      )}
      {currentScreen === "piercer" && (
        <SignupScreen
          trigger={true}
          setTrigger={() => setCurrentScreen("main")}
        />
      )}
      {currentScreen === "user" && (
        <SignupScreen
          trigger={true}
          setTrigger={() => setCurrentScreen("main")}
        />
      )}
    </>
  ) : (
    ""
  );
}
