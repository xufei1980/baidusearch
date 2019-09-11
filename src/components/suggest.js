import React, {Component} from 'react'
import jsonp from 'jsonp'
export default class Suggest extends Component{
    constructor(){
        super()
        this.state={words:[],
                    index:-1}
    }
    handleChange=(e)=>{
       let wd=e.target.value
       jsonp(`http://www.baidu.com/su?wd=${wd}`,{param:'cb'},(err,data)=>{
           console.log(data.s)
             this.setState({words:data.s})
       })
    }
    handleKeydown=(e)=>{
         let code=e.keyCode
         switch(code){
             case 40: this.state.index===this.state.words.length-1?this.setState({index:-1}):this.setState({index:this.state.index+1})
             break
             case 38: this.state.index===-1?this.setState({index:this.state.words.length-1}):this.setState({index:this.state.index-1})
             break
             case 13:
                 e.target.value=this.state.words[this.state.index]
                  window.location.href=`http://www.baidu.com/s?wd=${e.target.value}`
                 break

         }
        
         
    }
    handleLiClick=()=>{
        window.location.href=`http://www.baidu.com/s?wd=${this.state.words[this.state.index]}`
    }
    onMove=(id)=>{
        this.setState({
          index:id
        })
     }
   render(){
       return(
           <div className='container'>
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                       <div className="panel panel-default">
                           <div className="panel-heading">
                              <input type="text" className='form-control' onChange={this.handleChange} onKeyDown={this.handleKeydown}/>
                           </div>
                           <div className="panel-body">
                               <ul className='list-group'>
                                   {this.state.words.map((item,index)=>(
                                       <li className={'list-group-item '+(index===this.state.index?'active':null)} 
                                       key={index}
                                       onClick={this.handleLiClick}
                                       onMouseMove={()=>this.onMove(index)}>
                                       {item}</li>
                                   ))

                                   }
                                     
                                
                               </ul>
                           </div>
                       </div>
                    </div>
                </div> 
           </div>
       )
   }
}