import HeaderDesktop from "./HeaderDesktop/HeaderDesktop";

const Header = ({ mySize }) => {
  return (
    <>
        <div className="header">
            <HeaderDesktop mySize={mySize} />
        </div>
        <div style={{padding: '55px 15px 15px 75px'}}></div></>
  );
};

export default Header;
