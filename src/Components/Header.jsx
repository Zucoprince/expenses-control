import "../Styles/Header.css";

export default function Header() {
  return (
    <header>
      <div className="header_div_img">
        <img className="header_img" src="/cifrao-com-luz.png"></img>
        <div className="header_title">Controle de Gastos Inteligente</div>
      </div>
      <div className="header_div_login">
        <button className="header_button_login">Login</button>
        <button className="header_button_signup">Sign up</button>
      </div>
    </header>
  );
}
