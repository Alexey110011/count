import {useState, useEffect}from 'react';
import './App.css';
import {Income, Outcome, Loans, Investments, Form1, Transaction, Summary} from './Form'
import {Link,Routes, Route} from "react-router-dom"
//import data from "./newjson.json"

async function callBackendAPI1(){
  const response = await fetch('/t')
  const body = await response.json()
  if (response.status !== 200) {
    throw Error(body.message) 
  }console.log(body)
  return body;
  }

export function App() {
   const [data, setData] = useState()
   
   
   /*useEffect(()=>{
    async function callBackendAPI1(){
      const response = await fetch('/t')
      const body = await response.json()
      if (response.status !== 200) {
        throw Error(body.message) 
      }console.log(body)
      return body;
     }
       const fff =()=>{
      callBackendAPI1().then(res=>{
        console.log(res)
        setData(res)
        console.log(data)
      })}
    fff()
   },[])*/

  const fff =()=>{
        callBackendAPI1().then(res=>{
          console.log(res)
          setData(res)
        })
  }

  return (
    <div className="App"> 
      <div className = "tablo" onClick = {fff}>
        <nav className = "navpanel">
           <ul> 
              <Link to = "/tab=5"><li>New transaction</li></Link>
              <Link to = "/tab=0"><li>Income</li></Link>
              <Link to = "/tab=1"><li>Outcome</li></Link>
              <Link to = "/tab=2"><li>Loans</li></Link>
              <Link to = "/tab=3"><li>Investments</li></Link>
              <Link to = "/tab=4"><li>Contragents</li></Link>
              <Link to = "/"><li>Summary</li></Link>
          </ul>
        </nav>
      </div>
       
        <Routes>
          <Route path = "/tab=5" element ={<Transaction data={data}/>}/>
          <Route path ="/tab=0" element = {<Income data={data}/>}/>
          <Route path = "/tab=1" element = {<Outcome data={data}/>}/>
          <Route path = "/tab=2"  element ={<Loans data={data} />}/>
          <Route path = "/tab=3" element ={<Investments data={data}/>}/>
          <Route path = "/tab=4" element ={<Form1 data={data}/>}/>
          <Route path ="/" element = {<Summary data={data}/>}/>
      </Routes>
    </div>
  );
}

export default App;
