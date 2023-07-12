import React from "react"
import { useTheme } from 'next-themes'



const Nav:React.FC = () => {
  const { theme, setTheme } = useTheme()
return (

<div className="nav-container">
<span className="metrics-container">
  <p>All metrics (7)</p>
  <button className="show-button">show</button>
</span>


<span className="title-container">
  <img width="50%" src={theme === 'light' ? "/logo-dark.svg": "/logo.svg"}/>
  <p className="family-web">Family website</p>
</span>


<span className="row-container">
<button onClick={() => setTheme('dark')} className="day-toggle">
  <img src={theme === 'light' ? "/sun-blue.png": "/sun.png"}/>
</button>
<button onClick={() => setTheme('light')} className="night-toggle">
<img src= "/moon.png"/>
</button>
</span>

<style jsx>{`
@media (max-width: 564px) {
  .metrics-container {
    display:none;
  }

  .family-web {
   display:none;
  }

}

.nav-container {
  display:flex;
  justify-content: space-between;
  background: ${theme === 'light' ? "#000000" : "#FFFFFF" };
  box-shadow: 0px 14px 40px rgba(0, 0, 0, 0.05);
  width: 100%;
  padding: 12px 20px;
}

.title-container {
  display:flex;
  align-items:center;
  gap: 5px;

}

.family-web {
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.05em;
  color: #75777A;
}

.row-container {
  display:flex;
  align-items:center;

}

@media (min-width: 565px) {
.metrics-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 16px;
  justify-content:center;
  gap: 5px;  
  background: ${theme === 'light' ? "#000000": "#FFFFFF"};
  border: 1px solid ${theme === 'light' ?"#0477F4" : "#DDDDDD"};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
}
}

p {
  padding:0px;
  margin: 0px;
  color: ${theme === 'light' ? "#0477F4": "#000000" };

}

.show-button {
color: ${theme === 'light' ? "#FFFFFF" :"#0477F4" };
  border-style:none;
  background: none;
font-weight: 500;
font-size: 16px;
line-height: 19px;

}

.night-toggle {
  display:flex;
  align-items:center;
  background:${theme === 'light'? '#0477F4': '#FFFFFF' };
  border:1px solid ${theme === 'light' ? "#0477F4" :"transparent" };
  border-radius: 0px 4px 4px 0px;
  padding:7px;
}

.day-toggle {
  display:flex;
  align-items:center;
  background:${theme === 'light'? '#000000':'#EEF1F7' };
  border:1px solid ${theme === 'light' ? "#0477F4" :"transparent" };
  border-radius: 4px 0px 0px 4px;
  padding:7px;
}




`} </style>

</div>






)







}

export default Nav;