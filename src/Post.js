import React, {Component} from 'react'

class Post extends React.Component {
    render () {
        return(
<div className="Post">
    <form className = 'someText'>
        <textarea value = {this.props.value} onChange = {this.props.handleChange} placeholder = "Введите текст"></textarea>
    <button className="save" onClick = {this.props.handleSubmit}>Сохранить</button>
    </form>
    <form className = "searchTag">
        <input placeholder = "Искать заметку по тегу" value = {this.props.tag} onChange = {this.props.noteChange}></input>
    <button className="tagButton" onClick = {this.props.searchTag}>Искать</button>
    </form>
    <ul className = "listBox">
        {this.props.data.length>0?this.propss.data.map((item, index)=>
        <div key = {index} className = "notes">
            <li onClick={()=>this.props.handleActive(item)} className = "someNote">{item}</li>
            <button onClick={()=> this.props.edit(index)} className = "chageNote">Изменить заметку</button>
            <button onClick={()=>this.props.delPost(index)} className = "delNote">Удалить заметку</button>
            </div>):null}
       </ul>
       <ul className=' = "containerNote'>
           {this.props.length>0?this.props.note.map((item, index)=>
           <div key = {index} className = "tags">
               <li className = "someTag">{item}</li>
               <button onClick={() =>this.props.delHashtag(index)} className = "delTag">Удалить</button>
                          </div>):null}
       </ul>
    </div>
      )
    }
}
export default Post