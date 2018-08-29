import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    if (!this.props.data) return null;
    const { data } = this.props;

    return (
      <section className="section">
        <div className="container">
          <div className="teasers-wrapper">
            {data ? (
              data.map((el, i) => {
                const { title, thumbnail, id } = el.data;

                return (
                  <Link to={id} className="teaser-wrapper box" key={i}>
                    <img className="image" src={thumbnail} alt="" />
                    <span className="teaser-title">{title}</span>
                  </Link>
                );
              })
            ) : (
              <h3>Loading data...</h3>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
