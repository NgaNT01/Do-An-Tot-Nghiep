import HeaderDesktop from "./HeaderDesktop/HeaderDesktop";

const Header = ({title, mySize }) => {
  return (
    <>
        <div className="header">
            <HeaderDesktop title={title} mySize={mySize} />
        </div>
        <div style={{padding: '55px 15px 15px 75px'}}></div></>
  );
};

export default Header;
