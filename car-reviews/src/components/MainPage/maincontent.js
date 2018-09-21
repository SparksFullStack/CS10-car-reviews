import React, { Component } from 'react';
import placeholder from '../../logo.svg';
import { Button, Row, Col, Container } from 'reactstrap';
import ReviewModal from '../Modals/reviewmodal';
import axios from 'axios';
import './mainpage.css';

// This component generates Review and Reviewer cards. I chose to make the cards using buttons
// because they will need to be clicked on to open the review page. This is rendered in MainPage.

class MainContent extends Component {
    state = {
        popularCars: [],
        reviews: [],
        popularReviewers: []
      };

    componentWillMount() {
        const localcarsURL = "http://localhost:3001/api/popular/popular_cars";
        const localreviewsURL = "http://localhost:3001/api/popular/featured_reviews";
        const popularReviewersURL = "http://localhost:3001/api/popular/popular_reviewers"
        const deployedURL = "https://back-lambda-car-reviews.herokuapp.com/api/popular/popular_cars";
        axios.all([
            axios.get(localcarsURL),
            axios.get(localreviewsURL),
            axios.get(popularReviewersURL)
        ])
        .then(axios.spread((carsRes, reviewsRes, reviewersRes) => {
            this.setState({ popularCars: carsRes.data, 
                reviews: reviewsRes.data, 
                popularReviewers: reviewersRes.data
            });
        }))
        .catch(error => {
            console.error('Server Error', error)
        });
    }

    render() { 
        return ( 
            <div className="main-content">
                <Container>
                    <h3 className="header">Featured Reviews</h3>
                    <Row>
                        {this.state.reviews.map(review => {
                            return (
                                <Col md="3" xs="6" className="main-card" key={review._id}>
                                    <ReviewModal {...review} key={review._id}/>
                                </Col>
                            );
                        })}
                    </Row>
                    <h3 className="header">Popular Cars</h3>
                    <Row>
                        {this.state.popularCars.map(car => {
                            return (
                                <Col md="3" xs="6" key={car._id}>
                                    <Button className="main-card" key={car._id}> 
                                        <img src={placeholder} style={{ height: '60px' }} />
                                        <p>Star Rating {Math.round(car.averageScore * 100) / 100}</p>  
                                        <p>{car.year} {car.make} {car.model}</p>
                                        <p>{car.edition}</p>
                                    </Button>
                                </Col>
                            );
                        })}
                    </Row>
                    <h3 className="header">Popular Reviewers</h3>
                    <Row>
                        {this.state.popularReviewers.map(reviewer => {
                            return (
                                <Col md="3" xs="6" key={reviewer._id}>
                                    <Button className="main-card" key={reviewer._id}> 
                                        <img src={placeholder} style={{ height: '60px' }} />
                                        <p>{reviewer.username}</p>
                                    </Button>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </div>
        );
    }
}
 
export default MainContent;