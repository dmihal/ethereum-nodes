import React, {useState} from "react"



const Nav:React.FC = () => {
const [mode,setMode] = useState('day')

return (

<div className="nav-container">
<span className="metrics-container">
  <p>All metrics (7)</p>
  <button className="show-button">show</button>
</span>


<span className="title-container">
  <img width="50%" src="/logo.svg"/>
  <p className="family-web">Family website</p>
</span>


<span className="row-container">
<button onClick={() => setMode('day')} className="day-toggle">
  <img src="/sun.png"/>
</button>
<button onClick={() => setMode('night')} className="night-toggle">
<img src="/moon.png"/>
</button>
</span>

<style jsx>{`
.nav-container {
  display:flex;
  justify-content: space-between;
  background: #FFFFFF;
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

.metrics-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 16px;
  justify-content:center;
  gap: 5px;  
  background: #FFFFFF;
  border: 1px solid #DDDDDD;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
  border-radius: 24px;
}

p {
  padding:0px;
  margin: 0px;

}

.show-button {
  color:#0477F4;
  border-style:none;
  background: none;
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 19px;

}

.night-toggle {
  display:flex;
  align-items:center;
  background:${mode === 'night'? '#BDD0F6': '#EEF1F7' };
  border-radius: 0px 4px 4px 0px;
  border-style:none;
  padding:7px;
}

.day-toggle {
  display:flex;
  align-items:center;
  background:${mode === 'day'?'#BDD0F6' : '#EEF1F7' };
  border-radius: 4px 0px 0px 4px;
  border-style:none;
  padding:7px;
}




`} </style>

</div>






)







}

export default Nav;