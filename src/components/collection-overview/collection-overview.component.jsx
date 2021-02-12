import React from 'react';
import './collection-overview.style.scss';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import CollectionPreview from '../preview-collection/collection-preview.component';
import {selectCollectionsForPerview} from '../../redux/shop/shop.selector';
const CollectionsOverview = ({collections})=>(
  <div className = 'collection-overview'>
    {
      collections.map(({id,...otherCollectionsProps}) =>(
      <CollectionPreview key= {id} {...otherCollectionsProps}/>
      ))
    }
  </div>
)

const mapStateToProps = createStructuredSelector({
  collections:selectCollectionsForPerview
})
export default connect(mapStateToProps)(CollectionsOverview);