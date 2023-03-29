import { FollowerDetails } from '@_types/user';
import { FunctionComponent } from 'react';
import classes from './Followers.module.css'
    
interface FollowersProps {
    followers: FollowerDetails[];
}
    
const Followers: FunctionComponent<FollowersProps> = ({ followers }) => {
    console.log(followers);
 return ( <></> );
}
    
export default Followers;