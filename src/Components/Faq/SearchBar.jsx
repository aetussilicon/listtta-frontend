import { useState } from "react";
import '../../Styles/Components/Faq/FaqSearchBar.css'

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
  
    const handleChange = (e) => {
      setSearchValue(e.target.value);
    };
  
    return (
      <div className="search-bar">
        <input type="text" placeholder="Pesquisar" value={searchValue} onChange={handleChange} />
      </div>
    );
  };
  
  export default SearchBar;