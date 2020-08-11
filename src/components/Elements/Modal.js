import React from 'react'
import { connect } from 'react-redux'

import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 
class Modal extends React.Component{
  constructor(props){
    super(props)
    
    this.state = {
      title: null,
      dateFrom: null,
      dateTo: null,
      pm: 'Денис Конев',
      admin: 'Просолим Лимитед',
      errors: {
        title: '',
        dateFrom: '',
        pm: '',
        admin: '',
      }
    }
  }
  
  handleChange = (type, text) => {
    console.log()
    this.setState({[type]: text})
  }
  
  validation = () => {
    this.setState({
      errors: {
        title: '',
        dateFrom: '',
        pm: '',
        admin: '',
      }
    })
    const { 
      title,
      dateFrom,
      pm,
      admin,
      errors,
    } = this.state
    
    let obj = {
      title: title,
      dateFrom: dateFrom,
      pm: pm,
      admin: admin,
    }
    
    let newObj = Object.entries(obj).reduce((newObj, [key, value]) => {
      if(value === null || value === ''){
        newObj[key] = 'Поле не может быть пустым'
      } 
      
      return newObj
    }, {})
    
    console.log('newObj', newObj)
    
    if(Object.keys(newObj).length === 0){
      console.log('OBJ', obj)
      this.props.createProject(obj)
      this.props.close()
    } else {
      this.setState({errors: {...errors, ...newObj}})
    }
  }
  
  render(){
    const { 
      title, 
      dateFrom, 
      dateTo, 
      pm, 
      admin, 
      errors 
    } = this.state
    
    return(
      <div className='modal'>
        <div className='modalForm'>
          <div className='modalFormHeader'>
            <p>Создать проект</p>
          </div>
          <div className='modalFormBody'>
            <div className='modalFormBodyRow'>
              <p>Название проекта</p>
              <input 
                style={{
                  borderColor: errors.title !== '' ? '#bf360c' : null
                }}
                onChange={(e) => this.handleChange('title', e.target.value)}
              />
              {
                errors.title !== '' ?
                <p className='errorText'>{errors.title}</p> :
                null
              }
            </div>
            <div className='modalFormBodyRow'>
              <p>Продолжительность проекта</p>
              <DatePicker
                selected={dateFrom}
                customInput={
                  <input
                    value={dateFrom}
                    onChange={date => this.handleChange('dateFrom', date)}
                    style={{
                      borderColor: errors.dateFrom !== '' ? '#bf360c' : null
                    }}
                  />
                }
                onChange={(date) => this.handleChange('dateFrom', date)}
              />
              {
                errors.dateFrom !== null ?
                <p className='errorText'>{errors.dateFrom}</p> :
                null
              }
            </div>
            <div className='modalFormBodyRow'>
              <p>Руководитель проекта</p>
              <input 
                value={pm}
                style={{
                  borderColor: errors.pm !== '' ? '#bf360c' : null
                }}
                onChange={(e) => this.handleChange('pm', e.target.value)}
              />
              {
                errors.pm !== '' ?
                <p className='errorText'>{errors.pm}</p> :
                null
              }
            </div>
            <div className='modalFormBodyRow'>
              <p>Администратор проекта</p>
              <input 
                value={admin}
                style={{
                  borderColor: errors.admin !== '' ? '#bf360c' : null
                }}
                onChange={(e) => this.handleChange('admin', e.target.value)}
              />
              {
                errors.admin !== '' ?
                <p className='errorText'>{errors.admin}</p> :
                null
              }
            </div>
          </div>
          <div className='modalFormFooter'>
            <div 
              className='buttonConfirm'
              onClick={() => this.validation()}
            >
              <p>Сохранить</p>
            </div>
            <div 
              className='buttonCancel'
              onClick={() => this.props.close()}
            >
              <p>Закрыть</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  createProject: (data) => dispatch({type: 'ADD_PROJECT', payload: data})
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)