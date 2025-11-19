import React from "react";
import Logo from '../../images/numero1.png';

class Header extends React.Component{
    render(){
        return(
            <div className="text-bg-dark p-3 text-center">
                <img src={Logo} alt="Logo del N1" width="100 px" className="mb-22"></img>                
                <h3>
                    Bienvenido a mi página de incidencias
                </h3>
            </div>
        );
    }
}
export default Header;