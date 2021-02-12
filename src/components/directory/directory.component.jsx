import React from 'react';
import MenuItem from '../../components/menu-items/menu-item.component'
import './directory.style.scss';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectDirectorySections} from '../../redux/directory/directory.selector'
const Directory = ({sections})=>( 
    <div className= "directory-menu">
      {
        sections.map(({id,...otherSectionProps})=>
        <MenuItem key= {id} {...otherSectionProps}/>
      )
      }
    </div>
  )
const mapSateToProps =createStructuredSelector({
  sections:selectDirectorySections

})
export default connect(mapSateToProps)(Directory);