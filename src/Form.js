import React, {useRef, useState} from 'react'
import {Link} from 'react-router-dom'

function getSum(total, number){
  return total+number
} 

const getActivity = (someData, trans)=> {
  if(someData){
  const copyData0 = structuredClone(someData)
  console.log(someData,copyData0)
  const copyData1 = copyData0.data.filter(item=>item.type===trans)
  .sort((a,b)=>(a.name.last > b.name.last) ? 1 :((b.name.last > a.name.last) ? -1: 0))
  console.log(copyData1)
  removeDoubleAll(copyData1)
  const copyData2 =copyData1.filter(item=>item!==null)
  return (copyData2&&copyData2.length!==0)?copyData2.map((item,i)=><li key = {i}>{item.name.last} {item.name.first}:{item.amount}</li>):null
}
}

function removeDoubleAll (data1){
    for (let i=0;i<data1.length-1;i++) {
      if(data1[i].name.last===data1[i+1].name.last&&data1[i].name.first===data1[i+1].name.first){
         data1[i+1].amount = parseInt(data1[i+1].amount)+parseInt(data1[i].amount)
         data1.splice(i,1,null)
      }
    console.log(data1)
   } 
  } 

  function removeDouble (data1){
    for (let i=0;i<data1.length-1;i++) {
      if(data1[i].name.last===data1[i+1].name.last){
         data1.splice(i,1,null)
      }
    } 
  } 


export const Income =({data})=>{
  if(data){
   return(
    <div className="field">
    {getActivity(data, "income")}
    </div>)
  } else {return null}
}
    
export const Outcome =({data})=>{
  if(data){
    return(
    <div className="field">
    {getActivity(data,"outcome")}
    </div>
 )} else {return null}
}

export const Loans=({data})=>{
    if(data){
      return(
    <div className="field">
    {getActivity(data, "loan")}
    </div>
 )} else {return null}
}
 
export const Investments =({data})=>{
    if(data){
      return(
     <div className="field">
    {getActivity(data, "investment")}
    </div>
 )} else {return null}
}

export const Menu = ()=>{
       return(
        <div className = "tablo">
            <nav className = "navpanel">
                <ul> 
                    <Link to = "/tab=5"><li>New transaction</li></Link>
                    <Link to="/tab=0"><li>Income</li></Link>
                    <Link to = "/tab=1"><li>Outcome</li></Link>
                    <Link to = "/tab=2"><li>Loans</li></Link>
                    <Link to = "/tab=3"><li>Investments</li></Link>
                    <Link to = "/tab=4"><li>Contragents</li></Link>
                    <Link to = "/"><li>Summary</li></Link>
                </ul>
            </nav>
          </div>
    )
}
export const Summary = ({data})=> {
 const getSummary =(someData, trans) => {
  return (someData&&someData.data.length!==0)?someData.data.filter(item=>item.type===trans).map((item/*,i*/)=>JSON.parse(item.amount)).reduce(getSum,0):null
}
 
  return(
    <div>
    <h2>Summary</h2>
            <ul className = "summary">
           <li>Income {getSummary(data, "income")}</li>
           <li>Outcome {getSummary(data, "outcome")}</li>
           <li>Loans {getSummary(data, "loan")}</li>
           <li>Investment {getSummary(data, "investment")}</li>
          </ul>
          </div>
  )
}

export const List = ({data=[]})=>{

  if(data&&data.length!==0){
  return(
   <ul> 111{data.map((item, i)=>{ 
    <li key = {i}>{item.name.last}</li>})}
    </ul>
  )
}else {return <div>111</div>}
}

export const Form1 = ({data})=>{
  const [sumIncome, setSumIncome] = useState()
  const [sumOutcome, setSumOutcome] = useState()
  const [sumLoans, setSumLoans] = useState()
  const [sumInvest, setSumInvest] = useState()
  const [am, setAm] = useState(false)
  const [m, setM] = useState()
  
   const selectRef = useRef('')
  
   const getPersonal=(someData, trans, selectref)=>{
    return (someData&&someData.data.length!==0)?someData.data.filter(item=>`${item.name.last} ${item.name.first}`===selectref.current.value).filter(item=>item.type===trans).map(item=>JSON.parse(item.amount)).reduce(getSum,null):null   
   }

    const showing =(e) => {
     const m1 = e.target.value
      setM(m1)
      console.log(m,n, selectRef.current.value)
    }
    const n = new RegExp(m)
   

   const showContragent = (e)=>{
      const sumIncome1 = getPersonal(data, "income", selectRef)
      const sumOutcome1 = getPersonal(data, "outcome", selectRef)
      const sumLoans1 = getPersonal(data, "loan",selectRef)
      const sumInvest1 = getPersonal(data, "investment", selectRef)
      console.log(selectRef.current.value)
      setSumIncome(sumIncome1)
      setSumOutcome(sumOutcome1)
      setSumLoans(sumLoans1)
      setSumInvest(sumInvest1)
  }


  if(data){
    console.log(data.data);
    let copyData0 = structuredClone(data)
    console.log(copyData0)
  
   copyData0.data.sort((a,b)=>(a.name.last > b.name.last) ? 1 :((b.name.last > a.name.last) ? -1: 0))
   console.log(copyData0)
   removeDoubleAll(copyData0.data)
   console.log(copyData0, data) 
   const copyData =copyData0.data.filter(item=>item!==null)
   
   const sho = (od) =>{
    const name1 = copyData.filter(item=>item.od===od)
    selectRef.current.value=`${name1[0].name.last} ${name1[0].name.first}`
    console.log(name1)
  }

  const amm =() => {
    setAm(!am)
    console.log(am)
   }
  if(!selectRef.current.value){
    return (
      <div>
        <input type = "search" ref = {selectRef} onChange= {showing}></input>
        {(copyData&&copyData.length!==0)?copyData.map((item=><li key = {item.od} onClick ={()=>sho(item.od)}>{item.name.last} {item.name.first}</li>)):null}
        <input type = "submit" value = "Show"  onClick = {showContragent}></input>
      </div>
    )
  } else {
     return (
    <div>  
          <input type = "search" ref = {selectRef} onChange= {showing}/>
          {(copyData&&copyData.length!==0)?
          copyData.filter(item=>n.test(`${item.name.last} ${item.name.first}`))
          .map(item =><li key ={item.od} onClick = {()=>sho(item.od)}>{item.name.last} {item.name.first}</li>):null}
        <input type = "submit" value = "Show"  onClick = {showContragent}></input>
        <li  onClick = {amm} >Incomes {sumIncome}</li>
        {(data&&data.data.length!==0)?data.data.filter(item=>`${item.name.last} ${item.name.first}`===selectRef.current.value).filter(item=>item.type==="income").map(item=><li className = {(!am)?"close":"open"} >{item.date}:{item.amount}</li>):null}
        <li onClick = {amm}>Outcomes {sumOutcome}</li>
        {(data&&data.data.length!==0)?data.data.filter(item=>`${item.name.last} ${item.name.first}`===selectRef.current.value).filter(item=>item.type==="outcome").map(item=><li className = {(!am)?"close":"open"} >{item.date}:{item.amount}</li>):null}
        <li  onClick={amm}>Loans {sumLoans}</li>
        {(data&&data.data.length!==0)?data.data.filter(item=>`${item.name.last} ${item.name.first}`===selectRef.current.value).filter(item=>item.type==="loan").map(item=><li className = {(!am)?"close":"open"} >{item.date}:{item.amount}</li>):null}
        <li  onClick = {amm}>Investment {sumInvest}</li>
        {(data&&data.data.length!==0)?data.data.filter(item=>`${item.name.last} ${item.name.first}`===selectRef.current.value).filter(item=>item.type==="investment").map(item=><li className = {(!am)?"close":"open"} >{item.date}:{item.amount}</li>):null}
            </div>)}
    } else{return null}
  }
  
export const Transaction=({data})=>{
  const lnRef = useRef()
  const fnRef=  useRef()
  const amRef= useRef()
  const trRef = useRef() 
  const mailRef = useRef()
  const numRef = useRef()
  const adRef = useRef()
  const dateRef = useRef()

 const [l, setL]= useState(null)
 const [viewLast,setViewLast]= useState(true)
 const [viewFirst,setViewFirst]= useState(true)
 const [viewInfo, setViewInfo] = useState(true)
 const [checkbox, setCheckbox] = useState(false)

const submit=(e)=>{
  e.preventDefault()
  callBackendAPI()
  .then(res =>{
  console.log(res)
  lnRef.current.value=''
  fnRef.current.value=''
  amRef.current.value=''
  trRef.current.value=''  
  mailRef.current.value='' 
  numRef.current.value=''
  adRef.current.value=''
  dateRef.current.value=''
  })
  .catch(err =>console.log(err))
  } 
  
 async function callBackendAPI(){
  const response = await fetch('/t', {
    method: "POST",
      body:JSON.stringify({
        name:{
      last:lnRef.current.value,
      first:fnRef.current.value},
      amount:amRef.current.value,
      type:trRef.current.value.toLowerCase(),
      usermail: mailRef.current.value,
      usernumber:numRef.current.value,
      address:adRef.current.value,
      od:Math.floor(Math.random()*1000),
      date:dateRef.current.value
      }
      ),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
  }})
  const body = await response.json()
  if (response.status !== 200) {
    throw Error(body.message) 
  }console.log(body)
  return body;
};


let  lastName,firstName;
  const lastname = (e) =>{
    const l1 = e.target.value
    setL(l1)
    console.log(l1)
  }
  const ln= new RegExp(l)
 

    if(data&&l){
      console.log(l)
       const lastName1 = data.data.filter(item=>ln.test(item.name.last)).sort((a,b)=>(a.name.last > b.name.last) ? 1 :((b.name.last > a.name.last) ? -1: 0))
       console.log(lastName1)
       removeDouble(lastName1)
      console.log(lastName1)
      lastName = lastName1.filter(item=>item!==null)
      console.log(lastName)
  }

  if(data&&l){
    console.log(lnRef.current.value)
     firstName = data.data.filter(item=>lnRef.current.value===item.name.last).sort((a,b)=>(a.name.last > b.name.last) ? 1 :((b.name.last > a.name.last) ? -1: 0))
  }

  const onClickLast = (od) =>{
    const name1 = lastName.filter(item=>item.od===od)
    lnRef.current.value=name1[0].name.last
     console.log(name1)
     setViewLast(false)
     firstName = lastName.filter(item=>lnRef.current.value===item.name.last).sort((a,b)=>(a.name.last > b.name.last) ? 1 :((b.name.last > a.name.last) ? -1: 0))
     console.log(firstName)
    }

   const onClickFirst = (od) =>{
    const name1 = firstName.filter(item=>item.od===od)
    fnRef.current.value=name1[0].name.first
    setViewFirst(false)
     console.log(name1)
     if(data){
      for (let i of data.data){
      if(i.name.last===lnRef.current.value&&i.name.first===fnRef.current.value){
        console.log(i)
        setViewInfo(false);
        setCheckbox(true)
        }
      }
    }
}
  
    return(
      <div>
          <form className = "form" onSubmit ={submit}>  
            <div className="form-zvonok"> 
              <label>Transaction <span>*</span></label>
              <select type='text' name='transactiontype' ref ={trRef}>
                <option>Income</option>
                <option>Outcome</option>
                <option>Loan</option>
                <option>Investment</option>
              </select>
              <label>Date <span>*</span></label>
                <input type='text' name='date' ref = {dateRef}/>
              <label>Last name <span>*</span></label>
                  <input type='text' name='userlastname' ref = {lnRef} onChange = {lastname}/>
                  {(lastName&&lastName.length!==0)?(lastName.map((item, i)=><li key = {i} onClick = {()=>onClickLast(item.od)} className = {(viewLast)?"visiblement":"cached"}>{item.name.last}</li>)):null}
              <label>First name <span>*</span></label>
                  <input type='text' name='userfirstname' ref = {fnRef}/>
                 
                  {(firstName&&firstName.length!==0)?(firstName.map((item, i)=><li key = {i} onClick = {()=>onClickFirst(item.od)} className = {(viewFirst)?"visiblement":"cached"}>{item.name.first}</li>)):null}
                   <label>Amount <span>*</span></label>
                  <input type='number' name='amount' ref = {amRef}/>
                  <div className = {(!checkbox)?"cached":"visiblement" }><label>Change personal data</label><input type = "checkbox"  onChange = {()=>setViewInfo(!viewInfo)}></input></div>
                      <div className = {(viewInfo)?"info":"noinfo"}>
                        <label>E-mail <span>*</span></label>
                        <input type='text' name='usermail' ref = {mailRef}/>
                      <label>Phone <span>*</span></label>
                          <input type='text' name='usernumber' ref = {numRef}/>
                      <label>Address <span>*</span></label>
                          <input type='text' name='address'ref = {adRef}/>
                      <label>Notes</label>
                  </div>
              <textarea className = "text" type='text' name='question'/>
              <input className="bot-send-mail" type='submit' value='Send'/>
            </div>
          </form>
      </div>
    )
}   
 