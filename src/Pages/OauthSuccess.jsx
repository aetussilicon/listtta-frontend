import '../Styles/Pages/OauthSuccess.css';

const OauthSuccess = () => {
  return (
    <main className='container oauth-success-container'>
      <h1>Parabéns! Agora você está cadastrado no LISTTTA.</h1>
      <h1>Enviamos uma senha para o seu email para poder logar no site.</h1>
      <a href='/'>
        <button className='btn'>Voltar para tela inicial</button>
      </a>
    </main>
  );
};

export default OauthSuccess;
