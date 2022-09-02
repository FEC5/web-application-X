import React from 'react';
import PubSub from 'pubsub-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegStar } from '@fortawesome/free-regular-svg-icons';
import card from './Card.module.css';
import instance from '../../../../../axiosConfig.js';

// eslint-disable-next-line react/prefer-stateless-function
class Card extends React.Component {
  static averageRating(ratings) {
    if (!ratings) {
      return null;
    }
    const total = Object.entries(ratings).reduce((prev, [key, value]) => (prev + key * value), 0);
    const count = Object.entries(ratings).reduce((prev, [_, value]) => (prev + value * 1), 0);
    return Math.floor((total / count) / 0.25) * 0.25;
  }

  constructor(props) {
    super(props);
    this.state = {
      info: {},
      styles: [],
      defaultStyle: {},
      reviewMeta: {},
    };
    this.getProductInfo = this.getProductInfo.bind(this);
  }

  componentDidMount() {
    this.getProductInfo();
  }

  async getProductInfo() {
    const { id } = this.props;
    const infoResponse = await instance.get(`/products/${id}`);
    const styleResponse = await instance.get(`/products/${id}/styles`);
    const reviewResponse = await instance.get('/reviews/meta', { params: { product_id: id } });

    const { data: infoData } = infoResponse;
    const { data: { results: styleData } } = styleResponse;
    const { data: reviewData } = reviewResponse;

    const defaultStyle = styleData.filter((style) => style['default?'])[0] || styleData[0];

    this.setState({
      info: infoData,
      styles: styleData,
      defaultStyle,
      reviewMeta: reviewData,
    });
  }

  showProduct = () => {
    const { id } = this.props;
    PubSub.publish('showProduct', { id });
  };

  showModal = (e) => {
    e.stopPropagation();
    const { id } = this.props;
    PubSub.publish('showModal', { isShown: true, id });
  };

  render() {
    const { info, reviewMeta, defaultStyle } = this.state;
    const { name, category } = info;
    const { original_price: originalPrice, sale_price: salePrice, photos } = defaultStyle;
    const { ratings } = reviewMeta;

    const averageRating = Card.averageRating(ratings);
    return (
      <div className={card.container} onClick={this.showProduct}>
        <FontAwesomeIcon icon={faRegStar} size="2xl" className={card.action} onClick={this.showModal} tabIndex="-1" />
        <div className={card['img-container']}>
          <img
            src={photos ? photos[0].url : ''}
            alt="No Pic Available"
            style={{ display: photos ? 'block' : 'none' }}
          />
        </div>
        <div className={card.info} style={{ display: ratings ? 'block' : 'none' }}>
          <div>{category}</div>
          <div>{name}</div>
          <div>
            <span style={{ display: salePrice ? 'inline' : 'none' }}>{`sale price: $ ${salePrice}`}</span>
            <span style={{ display: originalPrice ? 'inline' : 'none' }}>{`$ ${originalPrice}`}</span>
          </div>
          <div className={card.rating}>
            <div className={card['rating-overlay']} style={{ width: `${averageRating * 20}%` }} />
            <FontAwesomeIcon icon={faStar} size="lg" className={card.star} />
            <FontAwesomeIcon icon={faStar} size="lg" className={card.star} />
            <FontAwesomeIcon icon={faStar} size="lg" className={card.star} />
            <FontAwesomeIcon icon={faStar} size="lg" className={card.star} />
            <FontAwesomeIcon icon={faStar} size="lg" className={card.star} />
          </div>
        </div>
      </div>

    );
  }
}

export default Card;