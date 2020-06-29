import React,{useCallback} from 'react';
import Wraper from './HOC/Wraper';
import { useDispatch } from 'react-redux';

  

  
  

function Input (props) {
    const dispatch = useDispatch();
       
    const Clickfuntion=()=>
  {
    
        props.onclickfunction();
    
  }
    return(<input style={props.styles} id="reenter" onClick={Clickfuntion} value={props.val} type="submit" />)
}

export default (Wraper(Input)); 