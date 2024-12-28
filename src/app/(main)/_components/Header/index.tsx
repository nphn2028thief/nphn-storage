import FileUploader from "./FileUploader";
import Search from "./Search";

function Header() {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader />
      </div>
    </header>
  );
}

export default Header;
