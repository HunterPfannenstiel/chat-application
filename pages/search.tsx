import { FunctionComponent } from 'react';
import classes from './SearchPage.module.css'
import Search from '@ui/Search/Search';
    
interface SearchPageProps {
    
}
    
const SearchPage: FunctionComponent<SearchPageProps> = () => {
    
 return ( <Search userImage="https://upload.wikimedia.org/wikipedia/en/6/6a/Mike_Wazowski.png"/> );
}
    
export default SearchPage;